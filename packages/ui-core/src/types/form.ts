export type FormVariant = 'dark' | 'light'

export interface FormInputProps {
  name: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  value?: string
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  autocomplete?: string
  clearable?: boolean
  variant?: FormVariant
  class?: string
  inputClass?: string
  labelClass?: string
  wrapperClass?: string
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  name: string
  options: SelectOption[]
  value?: string
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  disabled?: boolean
  variant?: FormVariant
  class?: string
}

export interface CheckboxProps {
  name: string
  checked?: boolean
  indeterminate?: boolean
  label?: string
  description?: string
  disabled?: boolean
  class?: string
}

export type ToggleSize = 'sm' | 'md'

export interface ToggleProps {
  name: string
  checked?: boolean
  label?: string
  size?: ToggleSize
  disabled?: boolean
  class?: string
}

export interface TextareaProps {
  name: string
  value?: string
  placeholder?: string
  label?: string
  error?: string
  rows?: number
  maxlength?: number
  showCount?: boolean
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  variant?: FormVariant
  class?: string
}

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type RadioDirection = 'row' | 'column'

export interface RadioProps {
  name: string
  options: RadioOption[]
  value?: string
  label?: string
  direction?: RadioDirection
  disabled?: boolean
  class?: string
}

export interface SliderProps {
  name: string
  value?: number
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
  disabled?: boolean
  class?: string
}

export interface DatePickerProps {
  name: string
  value?: string
  label?: string
  error?: string
  placeholder?: string
  min?: string
  max?: string
  required?: boolean
  disabled?: boolean
  variant?: FormVariant
  class?: string
}

export interface ColorPickerProps {
  name: string
  value?: string
  label?: string
  presets?: string[]
  disabled?: boolean
  class?: string
}
