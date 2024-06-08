import type { store } from './utils/reducer/reducer'

/**
 * The type of the Redux store
 */
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

const modelName: string = import.meta.env.VITE_MODEL_NAME as string
const modelMode: string = import.meta.env.VITE_MODEL_MODE as string
const modelTemperature: number = 70 //import.meta.env.VITE_MODEL_TEMPERATURE as number
/****************************************************************;
 *                             USER                             *
 *            All the types used in the redux store             *
 *                 to track the user's question                 *
 *                    and the bot's response                    *
 *                                                              *
 ****************************************************************/
export interface User {
  question: Question // Question asked by user plus all the parameters required to generate a response
  messages: Message[] // Message exchanged between user & agent
  sheets: Sheet[] // Sheets associated to the reponse from 0 to 2
  additionalSheets: Sheet[] // suggested sheets to from 3 to 9
  chunks: Chunk[] // Chunks for the current response
  webservices: any[] // Dans sheets webservices: liens utiles lies aux sheets
  chatId: number // current chat id+
  streamId: number // current stream id
  history: UserHistory[] // history of the user's questions and the bot's responses
  lastStreamId: number // Keeps track of the last stream id, used to send feedback with the right stream id
}

export type UserHistory = {
  query: string
  chunks: Chunk[]
  response: string
  webservices: WebService[]
}

export type Message = {
  text: string[]
  chunks: Chunk[]
  sheets: Sheet[]
  sender: 'user' | 'agent'
}

// Contains the user query,
// as well as all the parameters required by the back-end to generate a response
export type Question = {
  model_name: string
  mode: string
  query: string | undefined
  limit: number
  context: string | undefined
  institution: string | undefined
  links: string | undefined
  temperature: number // temperature (originality) of the response
  sources: ['service-public', 'travail-emploi']
  should_sids: string[] // sheets id that should be used by the agent to generate the response
  must_not_sids: string[] // sheets id forbidden to be used by agent to generate response
}
export const InitialQuestion: Question = {
  model_name: modelName,
  mode: modelMode,
  query: undefined,
  limit: 7,
  context: undefined,
  institution: undefined,
  links: undefined,
  temperature: modelTemperature,
  sources: ['service-public', 'travail-emploi'],
  should_sids: [],
  must_not_sids: [],
}

/**
 * A sheet is a source document used by the bot to generate a response
 */
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

/**
 * A chunk is a part of a sheet that has been used to generate the repsonse
 */
export type Chunk = {
  hash: string
  sid: string // The sheet id
  title: string
  url: string
  introduction: string
  text: string
  context: string
  surtitre: string
  source: string
}

export type Chat = {
  name: string | undefined
  type: string | undefined
  creationDate: string | undefined
  updatedDate: string | undefined
  id: number | undefined
  userId: number | undefined
}

export type ArchiveType = {
  chat_id: number
  context: string
  model_name: string
  mode: string
  query: string | undefined
  limit: number
  institution: any
  links: any
  temperature: number
  sources: string[]
  should_sids: string[]
  must_not_sids: string[]
  response: string
  rag_sources: string[]
  id: number
  is_streaming: boolean
  user_id: number
  search_sids: string[]
  sheets: Sheet[]
  additionalSheets: Sheet[]
  webservices: []
  chunks: Chunk[]
}

/**
 * This object contains the result sent by the bot
 * it is used to track the state of the response
 */
export type Stream = {
  response: string
  historyStream: string[]
  isStreaming: boolean
  activeTab: number // deprecated
}

/****************************************************************
 *                            OTHER                             *
 ****************************************************************/

/**
 * Used to type Tiles in DSFR
 */
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

/**
 * Additional inputs for a meeting
 */
export type MeetingInputContext = {
  administrations: string[]
  themes: string[]
}

/**
 * Useful links for the meeting's response
 */
export type WebService = {
  title: string
  institution: string
  url: string
  type: string
}

/**
 * Feedback form after a meeting response
 */
export interface Feedback {
  reasons: string[]
  isConfirmed: boolean
  isGood: number | undefined
  message: string
}

export const InitialFeedback: Feedback = {
  reasons: [],
  isConfirmed: false,
  isGood: undefined,
  message: '',
}
