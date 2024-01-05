import { initialAuth } from "./state"

export const authReducer = (state = initialAuth, action) => {
	switch (action.type) {
		case "SET_EMAIL":
			return {
				...state,
				email: action.nextEmail,
			}
		case "SET_USERNAME":
			return {
				...state,
				username: action.nextUsername,
			}
		case "SET_USER":
			return {
				...state,
				username: action.nextUsername,
				email: action.nextEmail,
			}
		case "LOGIN":
			return {
				...state,
				isLogin: true,
				userToken: action.nextUserToken,
			}
		case "LOGOUT":
			return initialAuth
		default: {
			return state
		}
	}
}
