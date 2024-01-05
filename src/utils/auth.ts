export interface UserAuth {
	email: string
	username: string
	authToken: string
	isLogin: boolean
}

export const InitialUserAuth: UserAuth = {
	email: "",
	username: "",
	authToken: "",
	isLogin: false,
}