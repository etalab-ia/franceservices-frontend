import { NOT_SET } from "../../constants/status"

export const initialAuth = {
	username: "",
	email: "",
	userToken: "",
	isLogin: false,
}

export const initialStream = {
	response: [],
	historyStream: [],
	isStreaming: false,
	activeTab: 1,
}
