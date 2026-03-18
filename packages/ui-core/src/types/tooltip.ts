export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  text: string
  position?: TooltipPosition
  class?: string
}
