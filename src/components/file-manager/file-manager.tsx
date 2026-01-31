import React, { useEffect, useState } from 'react'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import {
  FileBrowser,
  FileNavbar,
  FileToolbar,
  FileList,
  setChonkyDefaults,
  defineFileAction,
  ChonkyActions,
  type FileBrowserProps
} from 'chonky'
import _ from 'lodash'

import {
  fetchFiles,
  getAcceptedExtensionsForUploading,
  handleDrop,
  handleFileAction,
  type LocalFile
} from './file-manager.func'

type FileBrowserComponentProps = FileBrowserProps & { children?: React.ReactNode }

const TypedFileBrowser = FileBrowser as unknown as React.FC<FileBrowserComponentProps>

setChonkyDefaults({
  iconComponent: ChonkyIconFA
} as unknown as Parameters<typeof setChonkyDefaults>[0])

const rootFolder: LocalFile = {
  id: 'root',
  name: 'Home',
  mainName: 'Home',
  isFile: false,
  url: '',
  isDir: true,
  parentId: null
}

const RenameFileAction = defineFileAction({
  id: 'rename_file',
  requiresSelection: true,
  button: {
    name: 'Rename item',
    toolbar: true,
    contextMenu: true,
    icon: 'text'
  }
})

const DeleteFileAction = defineFileAction({
  id: 'delete_file',
  requiresSelection: true,
  button: {
    name: 'Delete item',
    toolbar: true,
    contextMenu: true,
    icon: 'trash'
  }
})

interface FileManagerProps {
  onChangeFile?: (file: LocalFile) => void
  filterTypes?: string[]
}

const FileManager: React.FC<FileManagerProps> = ({ onChangeFile = () => {}, filterTypes = ['all'] }) => {
  const [currentFolderId, setCurrentFolderId] = useState<string>('root')
  const [files, setFiles] = useState<LocalFile[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [folderChain, setFolderChain] = useState<LocalFile[] | null>(null)

  useEffect(() => {
    fetchFiles({ setLoading, setFiles, filterTypes, init: !folderChain }, currentFolderId)
  }, [currentFolderId])

  useEffect(() => {
    const generateFolderChain = () => {
      const foldersRaw = localStorage.getItem('website.folders')

      if (!folderChain && foldersRaw) {
        try {
          const folders: LocalFile[] = JSON.parse(foldersRaw)
          const lastItem = _.last(folders)
          if (lastItem) {
            setCurrentFolderId(lastItem.id)
            setFolderChain(folders)
            return
          }
        } catch (error) {
          console.error('Failed to parse stored folders', error)
        }
      }

      const chain: LocalFile[] = []
      let folderId: string | null = currentFolderId

      while (folderId) {
        let folder: LocalFile | undefined = folderId === 'root' ? rootFolder : files.find((item) => item.id === folderId)

        if (!folder && folderChain) {
          folder = folderChain.find((item) => item.id === folderId)
        }

        if (!folder) break

        chain.unshift(folder)
        folderId = typeof folder.parentId === 'string' && folder.parentId.length > 0 ? folder.parentId : null
      }

      localStorage.setItem('website.folders', JSON.stringify(chain))
      setFolderChain(chain)
    }

    generateFolderChain()
  }, [currentFolderId, files])

  return (
    <div
      style={{ height: '100%', padding: '10px', border: '2px dashed #ccc' }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop({ setLoading, setFiles, currentFolderId, filterTypes }, event)}
    >
      <input
        id="fileUploadInput"
        type="file"
        multiple
        onChange={(event) => handleDrop({ setLoading, setFiles, currentFolderId, filterTypes }, event)}
        style={{ display: 'none' }}
        accept={_.join(getAcceptedExtensionsForUploading(filterTypes), ',')}
      />

      <TypedFileBrowser
        files={files}
        folderChain={folderChain ?? []}
        onFileAction={(data) =>
          handleFileAction({ files, setFiles, currentFolderId, setCurrentFolderId, onChangeFile, setLoading, filterTypes }, data)
        }
        fileActions={[
          RenameFileAction,
          DeleteFileAction,
          ChonkyActions.CreateFolder,
          ChonkyActions.UploadFiles,
          ChonkyActions.EnableListView,
          ChonkyActions.EnableGridView,
          ChonkyActions.SortFilesByName,
          ChonkyActions.ToggleShowFoldersFirst
        ]}
        disableDragAndDrop={true}
        disableDefaultFileActions={true}
      >
        {loading && (
          <div
            style={{ zIndex: 1, top: 0, position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <h2>Loading files...</h2>
          </div>
        )}
        <FileNavbar />
        <FileToolbar />
        <FileList />
      </TypedFileBrowser>
      <style>
        {`
          .chonky-chonkyRoot {
            position: relative;
          }
        `}
      </style>
    </div>
  )
}

export default FileManager
