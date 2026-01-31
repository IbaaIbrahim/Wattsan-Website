import _ from 'lodash'

export interface FileTypeDefinition {
  fileType: number
  code: string
  label: string
  extensions: string[]
}

const folder: FileTypeDefinition = { fileType: 0, code: 'folder', label: 'Folder', extensions: [] }
const image: FileTypeDefinition = {
  fileType: 1,
  code: 'image',
  label: 'Image',
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
}
const video: FileTypeDefinition = {
  fileType: 2,
  code: 'video',
  label: 'Video',
  extensions: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv']
}
const audio: FileTypeDefinition = {
  fileType: 3,
  code: 'audio',
  label: 'Audio',
  extensions: ['mp3', 'wav', 'ogg', 'flac', 'aac']
}
const document: FileTypeDefinition = {
  fileType: 4,
  code: 'document',
  label: 'Document',
  extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']
}
const archive: FileTypeDefinition = {
  fileType: 5,
  code: 'archive',
  label: 'Archive',
  extensions: ['zip', 'rar', '7z', 'tar', 'gz']
}
const executable: FileTypeDefinition = {
  fileType: 6,
  code: 'executable',
  label: 'Executable',
  extensions: ['exe', 'msi', 'apk', 'bat', 'sh', 'app', 'bin']
}
const code: FileTypeDefinition = {
  fileType: 7,
  code: 'code',
  label: 'Code',
  extensions: ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'py', 'java', 'c', 'cpp', 'rb', 'php']
}
const threeD: FileTypeDefinition = {
  fileType: 8,
  code: 'threeD',
  label: 'ThreeD',
  extensions: ['glb']
}

export const FILE_TYPES: Record<string | number, FileTypeDefinition> = {
  folder,
  0: folder,
  image,
  1: image,
  video,
  2: video,
  audio,
  3: audio,
  document,
  4: document,
  archive,
  5: archive,
  executable,
  6: executable,
  code,
  7: code,
  threeD,
  8: threeD
}

export const FILE_TYPES_BY_CODES: Record<string, FileTypeDefinition> = {}
_.forEach(FILE_TYPES, (typeInfo, typeKey) => {
  if (typeof typeKey === 'string') {
    FILE_TYPES_BY_CODES[typeKey] = typeInfo
  }
})

export const FILE_TYPES_BY_ID: Record<number, FileTypeDefinition> = {}
_.forEach(FILE_TYPES, (typeInfo, typeKey) => {
  if (typeof typeKey === 'number') {
    FILE_TYPES_BY_ID[typeKey] = typeInfo
  }
})
