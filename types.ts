import { store } from './src/utils/reducer/reducer'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const modelName: string = import.meta.env.VITE_MODEL_NAME as string
const modelMode: string = import.meta.env.VITE_MODEL_MODE as string

export type Question = {
  model_name: string
  mode: string
  query: string | undefined
  limit: number
  context: string | undefined
  institution: string | undefined
  links: string | undefined
  temperature: number
  sources: ['service-public', 'travail-emploi']
  should_sids: string[]
  must_not_sids: string[]
}
export const InitialQuestion: Question = {
  model_name: modelName,
  mode: modelMode,
  query: undefined,
  limit: 7,
  context: undefined,
  institution: undefined,
  links: undefined,
  temperature: 20,
  sources: ['service-public', 'travail-emploi'],
  should_sids: [],
  must_not_sids: [],
}
export type Chat = {
  name: string | undefined
  type: string | undefined
  creationDate: string | undefined
  updatedDate: string | undefined
  id: number | undefined
  userId: number | undefined
}

export const InitialChat: Chat = {
  name: undefined,
  type: undefined,
  creationDate: undefined,
  updatedDate: undefined,
  id: undefined,
  userId: undefined,
}

export type Archive = {
  question: Question
  streamsId: number[]
  type: string | undefined
  date: string | undefined
}

export const InitialArchive: Archive = {
  question: InitialQuestion,
  streamsId: [],
  type: undefined,
  date: undefined,
}

export type ArchiveType = {
  model_name: string
  mode: string
  query: string | undefined
  user_text: string
  limit: number
  context: undefined
  institution: undefined
  links: undefined
  temperature: number
  sources: string[]
  should_sids: string[]
  must_not_sids: string[]
  response: string
  rag_sources: string[]
  id: number
  is_streaming: boolean
  user_id: number
  chat_id: number
  search_sids: string[] //
  // ICI
  sheets: any[]
  additionalSheets: any[]
  webservices: []
  chunks: any[]
}

export type StreamState = {
  response: string[]
  historyStream: string[]
  isStreaming: boolean
  activeTab: number
}

export interface User {
  question: Question // Question asked by user plus all the parameters required to generate a response
  messages: Message[] // Message exchanged between user & agent
  sheets: any[] // Sheets associated to the reponse from 0 to 2
  additionalSheets: any[] // suggested sheets to from 3 to 9
  chunks: any[] // Chunks associes a la reponse
  webservices: any[] // Dans sheets webservices: liens utiles lies aux sheets
  chatId: number // current chat id
  streamId: number // current stream id
}

export type Message = {
  text: string[]
  sender: string
}

export type Tile = {
  id?: string
  className?: string
  title: JSX.Element
  linkProps: {
    href: string
    target?: string
    rel?: string
  }
  desc?: JSX.Element
  imageUrl?: string
  imageAlt?: string
  imageWidth?: string | number
  imageHeight?: string | number
  grey?: boolean
  enlargeLink?: boolean
  classes?: Partial<
    Record<'root' | 'title' | 'link' | 'body' | 'desc' | 'img' | 'imgTag', string>
  >
  horizontal?: boolean
}

export type Sheet = {
  hash: string
  sid: string
  title: string
  url: string
  introduction: string
  text: string
  context: string
  theme: string
  surtitre: string
  source: string
  related_questions: {
    question: string
    sid: string
    url: string
  }[]
  web_services?: {
    title: string
    institution: string
    url: string
    type: string
  }[]
}
