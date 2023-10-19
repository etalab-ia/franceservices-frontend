export const	initialQuestion = {
	institution: '',
	title: '',
	user_text: '',
	context: '',
	links: '',
	temperature: 10,
}

export const	initialAuth = {
	username: '',
	email: '',
	userToken: '',
	isLogin: false,
	authFailed: false,
}

export const	initialStream = {
	response: [],
	historyStream: [],
	isStoppable: true,
	isStreaming: false,
}

export const	initialArchive = [
	{
		title: '',
		themes: [],
		date: '',
		source: false,
	},
	{
		title: '',
		themes: [],
		date: '',
		source: false,
	}
]	