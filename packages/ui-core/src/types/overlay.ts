export type OverlayBackdrop = 'blur' | 'dark' | 'transparent' | 'none'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  open: boolean
  title?: string
  size?: ModalSize
  backdrop?: OverlayBackdrop
  closable?: boolean
  closeOnOverlay?: boolean
  class?: string
}

export type DialogVariant = 'info' | 'warning' | 'danger' | 'success'

export interface DialogProps {
  open: boolean
  title: string
  description?: string
  variant?: DialogVariant
  backdrop?: OverlayBackdrop
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  class?: string
}

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

export interface ToastProps {
  message: string
  variant?: ToastVariant
  duration?: number
  dismissible?: boolean
  position?: ToastPosition
  class?: string
}

export interface ImgBoxProps {
  images: string[]
  index?: number
  open: boolean
  backdrop?: OverlayBackdrop
  captions?: string[]
  class?: string
}
