import type { ButtonColor } from './button'

export type FormVariant = 'dark' | 'light'
export type FormInputVariant = 'outlined' | 'filled' | 'underline'

export interface FormInputClasses {
  root?: string
  label?: string
  input?: string
  icon?: string
  error?: string
}

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
  inputVariant?: FormInputVariant
  color?: ButtonColor
  classes?: FormInputClasses
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

export interface SelectClasses {
  root?: string
  label?: string
  select?: string
  error?: string
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
  inputVariant?: FormInputVariant
  color?: ButtonColor
  classes?: SelectClasses
  class?: string
}

export interface CheckboxClasses {
  root?: string
  input?: string
  label?: string
  description?: string
}

export interface CheckboxProps {
  name: string
  checked?: boolean
  indeterminate?: boolean
  label?: string
  description?: string
  disabled?: boolean
  color?: ButtonColor
  classes?: CheckboxClasses
  class?: string
}

export type ToggleSize = 'sm' | 'md'

export interface ToggleClasses {
  root?: string
  track?: string
  dot?: string
  label?: string
}

export interface ToggleProps {
  name: string
  checked?: boolean
  label?: string
  size?: ToggleSize
  disabled?: boolean
  color?: ButtonColor
  classes?: ToggleClasses
  class?: string
}

export interface TextareaClasses {
  root?: string
  label?: string
  textarea?: string
  error?: string
  count?: string
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
  inputVariant?: FormInputVariant
  color?: ButtonColor
  classes?: TextareaClasses
  class?: string
}

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type RadioDirection = 'row' | 'column'

export interface RadioClasses {
  root?: string
  legend?: string
  input?: string
  label?: string
  description?: string
}

export interface RadioProps {
  name: string
  options: RadioOption[]
  value?: string
  label?: string
  direction?: RadioDirection
  disabled?: boolean
  color?: ButtonColor
  classes?: RadioClasses
  class?: string
}

export interface SliderClasses {
  root?: string
  label?: string
  value?: string
  input?: string
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
  color?: ButtonColor
  classes?: SliderClasses
  class?: string
}

export interface DatePickerClasses {
  root?: string
  label?: string
  trigger?: string
  calendar?: string
  error?: string
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
  color?: ButtonColor
  classes?: DatePickerClasses
  class?: string
}

export interface ColorPickerClasses {
  root?: string
  label?: string
  trigger?: string
  dropdown?: string
  hexInput?: string
}

export interface ColorPickerProps {
  name: string
  value?: string
  label?: string
  presets?: string[]
  disabled?: boolean
  color?: ButtonColor
  classes?: ColorPickerClasses
  class?: string
}
