export interface DropdownItem {
  label: string
  value?: string
  icon?: any
  danger?: boolean
  disabled?: boolean
}

export interface DropdownDivider {
  divider: true
}

export type DropdownEntry = DropdownItem | DropdownDivider

export type DropdownAlign = 'left' | 'right'

export interface DropdownProps {
  items: DropdownEntry[]
  align?: DropdownAlign
  class?: string
}
