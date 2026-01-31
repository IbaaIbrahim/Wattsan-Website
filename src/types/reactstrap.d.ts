declare module 'reactstrap' {
  import * as React from 'react'

  export const Button: React.ComponentType<any> & { Ripple?: React.ComponentType<any> }
  export const Modal: React.ComponentType<any>
  export const ModalHeader: React.ComponentType<any>
  export const ModalBody: React.ComponentType<any>
  export const ButtonGroup: React.ComponentType<any>
}
