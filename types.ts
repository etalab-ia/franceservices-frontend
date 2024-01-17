import { store } from "./src/utils/reducer/reducer"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type Question = {
	model_name: "albert-light"
	mode: "rag"
	query: string | undefined
	limit: number
	context: string | undefined
	institution: string | undefined
	links: string | undefined
	temperature: number
	sources: ["service-public", "travail-emploi"]
	should_sids: string[]
	must_not_sids: string[]
}

export const InitialQuestion: Question = {
	model_name: "albert-light",
	mode: "rag",
	query: undefined,
	limit: 7,
	context: undefined,
	institution: undefined,
	links: undefined,
	temperature: 20,
	sources: ["service-public", "travail-emploi"],
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
