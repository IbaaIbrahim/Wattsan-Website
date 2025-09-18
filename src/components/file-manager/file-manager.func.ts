import { ChonkyActions } from 'chonky'
import type { ChonkyFileActionData, FileData } from 'chonky'
import type { ChangeEvent, Dispatch, DragEvent as ReactDragEvent, SetStateAction } from 'react'
import _ from 'lodash'

import {
  _deleteFileManagerItem,
  _getFileManagerData,
  _storeFileManagerItem,
  _updateFileManagerItemTitle
} from './actions'
import { FILE_TYPES, FILE_TYPES_BY_CODES, type FileTypeDefinition } from './file-types'

export interface ApiFile extends FileData {
  isFile: boolean
  url?: string
  thumbnail?: string | null
  parentId?: string | null
  [key: string]: unknown
}

export interface LocalFile extends ApiFile {
  mainName: string
  isDir: boolean
  thumbnailUrl?: string | null
  parentId: string | null
}

type FileLike = string | Pick<File, 'name'>

type DropEvent = ReactDragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>

const isDragEvent = (event: DropEvent): event is ReactDragEvent<HTMLDivElement> => 'dataTransfer' in event

const getExtensionFromUrl = (url?: string | null): string => {
  if (!url) return ''
  const dotIndex = url.lastIndexOf('.')
  return dotIndex > -1 ? url.slice(dotIndex) : ''
}

export const generateFileName = (file: Pick<ApiFile, 'isFile' | 'url' | 'name'>): string => {
  if (file.isFile) {
    const extension = getExtensionFromUrl(file.url)
    return `${file.name}${extension}`
  }

  return file.name
}

export const mapApiFileToLocal = (file: ApiFile): LocalFile => {
  return {
    ...file,
    mainName: file.name,
    name: generateFileName(file),
    isDir: !file.isFile,
    thumbnailUrl: (file.thumbnail as string | null | undefined) ?? file.thumbnailUrl ?? null,
    parentId: file.parentId ?? 'root'
  }
}

const findTypeDefinitionByCode = (code: string | null): FileTypeDefinition | undefined => {
  if (!code) return undefined
  return _.find(FILE_TYPES_BY_CODES, (typeInfo) => typeInfo.code === code)
}

/**
 * Returns a numeric file type based on the file extension.
 */
export const getFileTypeFromFile = (file: FileLike): number | null => {
  const fileName = typeof file === 'string' ? file : file.name
  if (!fileName || !fileName.includes('.')) return null

  const extension = fileName.split('.').pop()?.toLowerCase()
  if (!extension) return null

  let fileType: number | null = null
  _.forEach(FILE_TYPES, (typeInfo) => {
    if (typeInfo.code !== 'folder' && typeInfo.extensions && typeInfo.extensions.includes(extension)) {
      fileType = typeInfo.fileType
    }
  })

  return fileType
}

export const getAcceptedExtensionsForUploading = (filterTypes: string[]): string[] => {
  const extensionsGroups: string[][] = []
  _.forEach(FILE_TYPES_BY_CODES, (typeInfo, typeKey) => {
    if (filterTypes.indexOf(typeKey) > -1) {
      extensionsGroups.push(typeInfo.extensions)
    }
  })

  return _.flatMap(extensionsGroups, (extensions) => _.map(extensions, (extension) => `.${extension}`))
}

interface FetchFilesParams {
  setLoading: (value: boolean) => void
  setFiles: Dispatch<SetStateAction<LocalFile[]>>
  filterTypes: string[]
  init?: boolean
}

export const fetchFiles = (initParams: FetchFilesParams, parentId: string): void => {
  const { setLoading, setFiles, filterTypes, init } = initParams
  let currentParentId: string | null = parentId === 'root' ? null : parentId

  if (init) {
    const foldersRaw = localStorage.getItem('folders')
    if (foldersRaw) {
      try {
        const folders = JSON.parse(foldersRaw) as LocalFile[]
        const lastItem = _.last(folders)
        if (lastItem) {
          currentParentId = lastItem.id === 'root' ? null : lastItem.id
        }
      } catch (error) {
        console.error('Failed to parse folders from localStorage', error)
      }
    }
  }

  setLoading(true)
  _getFileManagerData(
    currentParentId,
    (data: ApiFile[]) => {
      const mappedFiles = _.map(data, (file) => mapApiFileToLocal(file))
      let filteredFiles = mappedFiles
      try {
        filteredFiles = _.filter(mappedFiles, (file) => {
          if (file.isDir || filterTypes.indexOf('all') > -1) {
            return true
          }

          const fileType = getFileTypeFromFile(file)
          const typeInfo = findTypeDefinitionByCode(
            fileType !== null ? FILE_TYPES[fileType]?.code ?? null : null
          )

          return typeInfo ? filterTypes.indexOf(typeInfo.code) > -1 : false
        })
      } catch (error) {
        console.error('Failed to filter files', error)
      }

      setFiles(filteredFiles)
    },
    () => {
      /* no-op error handler */
    },
    () => {
      setLoading(false)
    }
  )
}

interface DropParams extends FetchFilesParams {
  currentFolderId: string
}

export const handleDrop = async (initParams: DropParams, event: DropEvent): Promise<void> => {
  const { setLoading, setFiles, currentFolderId, filterTypes } = initParams

  if (isDragEvent(event)) {
    event.preventDefault()
  }

  const filesArray: File[] = isDragEvent(event)
    ? Array.from(event.dataTransfer?.files ?? [])
    : Array.from(event.currentTarget.files ?? [])

  if (!filesArray.length) return

  const formData = new FormData()
  filesArray.forEach((file) => {
    formData.append('files', file)
  })

  if (currentFolderId !== 'root') {
    formData.append('parentId', currentFolderId)
  }

  formData.append('IsFile', 'true')
  formData.append('FileType', String(getFileTypeFromFile(filesArray[0]) ?? ''))

  try {
    setLoading(true)
    _storeFileManagerItem(
      formData,
      () => {
        fetchFiles({ setLoading, setFiles, filterTypes }, currentFolderId)
      },
      () => {
        console.error('Error uploading files: request failed')
      },
      () => {
        setLoading(false)
      }
    )
  } catch (error) {
    console.error('Error uploading files:', error)
    setLoading(false)
  }
}

interface CreateFolderParams extends DropParams {}

export const createFolder = (initParams: CreateFolderParams, folderName: string): void => {
  const { setLoading, setFiles, currentFolderId, filterTypes } = initParams

  const formData = new FormData()
  formData.append('parentId', currentFolderId === 'root' ? '' : currentFolderId)
  formData.append('name', folderName)
  formData.append('IsFile', 'false')
  formData.append('FileType', '0')

  try {
    setLoading(true)
    _storeFileManagerItem(
      formData,
      () => {
        fetchFiles({ setLoading, setFiles, filterTypes }, currentFolderId)
      },
      () => {
        console.error('Error creating folder: request failed')
      },
      () => {
        setLoading(false)
      }
    )
  } catch (error) {
    console.error('Error uploading files:', error)
    setLoading(false)
  }
}

interface HandleFileActionParams extends DropParams {
  files: LocalFile[]
  setCurrentFolderId: (folderId: string) => void
  onChangeFile: (file: LocalFile) => void
}

const ensureLocalFiles = (files: FileData[] | undefined): LocalFile[] => {
  if (!files) return []
  return files as LocalFile[]
}

export const handleFileAction = async (
  initParams: HandleFileActionParams,
  data: ChonkyFileActionData
): Promise<void> => {
  const { setFiles, currentFolderId, setCurrentFolderId, onChangeFile, setLoading, filterTypes } = initParams
  const actionId = data.id as string

  const payloadFiles = ensureLocalFiles((data.payload as { files?: FileData[] } | undefined)?.files)
  const selectedFiles = ensureLocalFiles(data.state?.selectedFiles)

  const hasMultipleSelection = _.size(payloadFiles) > 1 || _.size(selectedFiles) > 1
  if (hasMultipleSelection) return

  if (actionId === ChonkyActions.OpenFiles.id) {
    const file = payloadFiles[0]
    if (file && file.isDir) {
      setCurrentFolderId(file.id)
    } else if (file) {
      onChangeFile(file)
    }
  } else if (actionId === ChonkyActions.CreateFolder.id) {
    const folderName = prompt('Enter folder name:')
    if (!folderName) return
    try {
      createFolder({ setLoading, setFiles, currentFolderId, filterTypes }, folderName)
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  } else if (actionId === ChonkyActions.UploadFiles.id) {
    document.getElementById('fileUploadInput')?.click()
  } else if (actionId === 'rename_file') {
    const selectedFile = selectedFiles[0]
    if (!selectedFile) return

    const newName = prompt('Enter new name:', selectedFile.mainName)
    if (!newName || newName.trim() === '') return

    _updateFileManagerItemTitle(
      { id: selectedFile.id, name: newName, parentId: selectedFile.parentId === 'root' ? null : selectedFile.parentId },
      () => {
        fetchFiles({ setLoading, setFiles, filterTypes }, currentFolderId)
      }
    )
  } else if (actionId === 'delete_file') {
    const selectedFile = selectedFiles[0]
    if (!selectedFile) return

    _deleteFileManagerItem(selectedFile.id, () => {
      fetchFiles({ setLoading, setFiles, filterTypes }, currentFolderId)
    })
  }
}
