export interface MediaFile {
  id?: number | string
  name: string
  path: string
  is_dir: boolean
  url: string | null
  size: number
  mime?: string | null
  modified?: string | null
}

export interface MediaBrowseResult {
  path: string
  entries: MediaFile[]
  total: number
}

export interface MediaProvider {
  browse: (path: string, search?: string) => Promise<MediaBrowseResult>
  upload?: (file: File, path?: string) => Promise<{ url: string; name: string }>
  delete?: (id: number | string) => Promise<void>
  createFolder?: (path: string) => Promise<void>
  move?: (source: string, dest: string) => Promise<void>
}

export type EditorTheme = 'default' | 'prose' | 'compact' | 'minimal'

export interface RichTextEditorProps {
  value?: string
  placeholder?: string
  media?: MediaProvider
  theme?: EditorTheme
  class?: string
}
