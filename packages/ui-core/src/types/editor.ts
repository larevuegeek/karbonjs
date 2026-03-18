export interface MediaFile {
  id: number | string
  url: string
  name: string
  size?: number
  type?: string
  created?: string
}

export interface MediaBrowseResult {
  files: MediaFile[]
  total: number
}

export interface MediaProvider {
  browse: (page: number, search?: string) => Promise<MediaBrowseResult>
  upload?: (file: File) => Promise<{ url: string; name: string }>
  delete?: (id: number | string) => Promise<void>
  createFolder?: (name: string) => Promise<void>
}

export interface RichTextEditorProps {
  value?: string
  placeholder?: string
  media?: MediaProvider
  class?: string
}
