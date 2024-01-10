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
