export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface AlertProps {
  type?: AlertType
  message?: string
  class?: string
}
