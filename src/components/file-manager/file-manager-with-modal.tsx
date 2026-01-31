import React, { useEffect, useState } from 'react'
import Button from '@components/ui/button/Button'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import _ from 'lodash'
import { Upload, Trash2 } from 'react-feather'

import FileManager from './file-manager'
import { FILE_TYPES } from './file-types'
import { getFileTypeFromFile, mapApiFileToLocal, type LocalFile, type ApiFile } from './file-manager.func'
import { _getFileManagerItemData } from './actions'

import cn from './Modal.module.scss'
import clsx from 'clsx'
import closeIcon from '@public/img/icons/close.svg'
import Image, { type StaticImageData } from 'next/image'
import userAvatar from '@public/img/account/user-avatar.png'

const ButtonRipple = Button

type FileManagerValue = LocalFile | string | null | Record<string, unknown>

interface GenerateThumbnailParams {
  isFullObject: boolean
  value: FileManagerValue
  fileObjectWhenIsFullObjectFalse: FileManagerValue
}

const getPlaceholderImage = (): StaticImageData | string => {
  if (typeof userAvatar === 'string') return userAvatar
  if (typeof (userAvatar as { src?: string }).src === 'string') return userAvatar
  // if (typeof (userAvatar as { default?: string }).default === 'string') return userAvatar.default
  return '/img/account/user-avatar.png'
}

const renderThumbnailImage = (src: StaticImageData | string): JSX.Element => (
  <Image
    alt=""
    fill
    sizes="(max-width: 768px) 50vw, 200px"
    src={src}
    style={{ objectFit: 'cover' }}
    unoptimized={typeof src === 'string'}
  />
)

export const generateThumbnail = ({
  isFullObject,
  value,
  fileObjectWhenIsFullObjectFalse
}: GenerateThumbnailParams): JSX.Element => {
  const fullObject = (isFullObject ? value : fileObjectWhenIsFullObjectFalse) as FileManagerValue

  const placeholderSrc = getPlaceholderImage()

  if (_.isEmpty(fullObject)) {
    return renderThumbnailImage(placeholderSrc)
  }

  if (typeof fullObject === 'object' && fullObject !== null && 'name' in fullObject) {
    const typedObject = fullObject as LocalFile

    if (
      FILE_TYPES['image'].fileType === getFileTypeFromFile(typedObject) ||
      (typedObject as { thumbnailUrl?: string }).thumbnailUrl
    ) {
      const fallbackUrl = (typedObject as { url?: string }).url ?? placeholderSrc
      const thumbnailUrl = (typedObject as { thumbnailUrl?: string }).thumbnailUrl ?? fallbackUrl
      return renderThumbnailImage(thumbnailUrl ?? fallbackUrl)
    }
  }

  return renderThumbnailImage(placeholderSrc)
}

interface FileManagerWithModalProps {
  value: FileManagerValue
  onChange: (value: FileManagerValue) => void
  onChangeState?: (value: FileManagerValue) => void
  onClose?: () => void
  filterTypes?: string[]
  isFullObject?: boolean
  defaultValue?: FileManagerValue
}

const FileManagerWithModal = React.forwardRef<HTMLDivElement, FileManagerWithModalProps>((props, _ref) => {
  const {
    value,
    onChange,
    onChangeState = () => { },
    onClose = () => { },
    filterTypes = ['image'],
    isFullObject = false,
    defaultValue
  } = props

  const [open, setOpen] = useState<boolean>(false)
  const [fileObjectWhenIsFullObjectFalse, setFileObjectWhenIsFullObjectFalse] = useState<FileManagerValue>({})

  const close = () => {
    setOpen(false)
    onClose()
  }

  useEffect(() => {
    onChangeState?.(value)
  }, [value, onChangeState])
  
  useEffect(() => {
    if (!isFullObject && _.size(value) > 0) {
      _getFileManagerItemData(value, (data: ApiFile[]) => {
        if (_.size(data) === 1) {
          setFileObjectWhenIsFullObjectFalse(mapApiFileToLocal(data[0]))
        }
      })
    }
  }, [isFullObject, value])

  const onSelectFile = (file: LocalFile) => {
    if (isFullObject) {
      onChange(file)
    } else {
      onChange(file.id)
      setFileObjectWhenIsFullObjectFalse(file)
    }
    close()
  }

  return (
    <>
      <style>
        {`
        .d-flex{
          display: flex;
        }
          .w-100 {
            width: 100%;
          }
            .h-100{
              height: 100%;
            }
          .filemanager-thumbnail-wrapper{
            position: relative;
            border-radius: 50px;
            overflow: hidden;
            .filemanager-thumbnail-btns{
              position: absolute;
              width: 100%;
              height: 100%;
              justify-content: center;
              align-items: center;
              display: none;
            }
              &:hover{
              .filemanager-thumbnail-btns{
                display: flex;
                background-color: #0000002B;
              }
            }
          }
        `}
      </style>
      <div
        className={'filemanager-thumbnail-wrapper d-flex justify-content-center align-items-center'}
        style={{ width: '100%', height: '100%' }}
      >
        {generateThumbnail({ isFullObject, value, fileObjectWhenIsFullObjectFalse })}
        <div className={'d-flex filemanager-thumbnail-btns position-absolute justify-content-center align-items-center'} style={{ top: 0 }}>
          <div className={'d-flex gap-2'}>
            <ButtonRipple className={'btn-icon'} size={'s'} onClick={() => setOpen(true)}>
              <Upload size={12} />
            </ButtonRipple>
            {/* {!_.isEmpty(value) && (
              <ButtonRipple
                className={'btn-icon'}
                size={'s'}
                onClick={() => {
                  if (isFullObject) {
                    onChange({})
                  } else {
                    onChange(null)
                    setFileObjectWhenIsFullObjectFalse({})
                  }
                }}
              >
                <Trash2 size={12} />
              </ButtonRipple>
            )} */}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={close}
        // className="modal-fullscreen"
        className={cn.dialog}
      >
        <DialogBackdrop className="modal-backdrop" />
        <div className={cn.wrapper}>
          {/* <div className={'d-flex justify-content-center align-items-start'} style={{ paddingTop: 40 }}> */}
          <DialogPanel
            className={clsx(cn.modal, cn['full'])}
          >
            <button
              className={cn.close}
              onClick={close}
            >
              <Image
                src={closeIcon}
                alt=''
              />
            </button>
            <div className={cn.contentWrapper} style={{}}>
              <FileManager onChangeFile={onSelectFile} filterTypes={filterTypes} />
            </div>

            {/* <div>
              <div className={'mb-1 d-flex justify-content-between align-items-center'}>
                <h5 className={'m-0'}>File manager</h5>
                <button className={'btn btn-link'} onClick={close} aria-label="Close">
                  ×
                </button>
              </div>
              <div>
                <FileManager onChangeFile={onSelectFile} filterTypes={filterTypes} />
              </div>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
})

FileManagerWithModal.displayName = 'FileManagerWithModal'

export default FileManagerWithModal
