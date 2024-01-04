import { signoutUrl } from "../constants/api"
import { useFetch } from "./hooks"
import { Navigate } from "react-router-dom"
import { userUrl } from "../constants/api"

export const storeAuth = async (token) => {
	localStorage.setItem("authToken", token)
}

export const setUserInfos = async (token, dispatch) => {
	const userInfos = await useFetch(
		userUrl,
		"GET",
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: null,
		},
		dispatch
	)

	storeAuth(token)
	dispatch({ type: "SET_USER", nextEmail: userInfos.email, nextUsername: userInfos.username })
}

export const checkId = (id, dispatch) => {
	if (id.includes("@")) dispatch({ type: "SET_USER", nextUsername: null, nextEmail: id })
	else dispatch({ type: "SET_USER", nextUsername: id, nextEmail: null })
}

const rmAuth = () => {
	localStorage.removeItem("authToken")
}

export const handleSignout = async (state, dispatch) => {
	await useFetch(signoutUrl, "POST", { headers: { Authorization: `Bearer ${state.userToken}` } })
		.then(rmAuth())
		.then((res) => dispatch({ type: "LOGOUT", nextUserToken: res.userToken }))

	return <Navigate to="/" />
}
