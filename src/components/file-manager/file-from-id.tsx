import React from 'react'

interface FileFromIdProps {
  children?: React.ReactNode
}

const FileFromId: React.FC<FileFromIdProps> = ({ children }) => {
  return <div className={'position-relative h-100 w-100'}>{children}</div>
}

export default FileFromId
