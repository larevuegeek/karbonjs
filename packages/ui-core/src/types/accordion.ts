export interface AccordionItem {
  id: string
  title: string
  content?: string
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  class?: string
}
