import { NOT_SET } from "../../constants/status"

export const initialQuestion = {
	model_name: "albert-light",
	mode: "rag",
	query: "",
	limit: 7,
	context: "",
	institution: "",
	links: "",
	temperature: 20,
	sources: ["service-public", "travail-emploi"],
	should_sids: [],
	must_not_sids: [],
}

export const initialUserChoices = {
	feedback: NOT_SET,
	newQuestion: NOT_SET,
	oldQuestion: NOT_SET,
}

export const initialUser = {
	question: initialQuestion,
	choices: initialUserChoices,
	messages: [],
	sheets: [],
	additionalSheets: [],
	chunks: [],
}

export const initialAuth = {
	username: "",
	email: "",
	userToken: "",
	isLogin: false,
	authFailed: false,
}

export const initialStream = {
	response: [],
	historyStream: [],
	isStreaming: false,
	activeTab: 1,
}
