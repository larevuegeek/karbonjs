export interface TabItem {
  id: string
  label: string
  icon?: any
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  active?: string
  class?: string
}
