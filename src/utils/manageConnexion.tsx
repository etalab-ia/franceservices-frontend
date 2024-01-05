import { signoutUrl } from "../constants/api"
import { useFetch } from "./hooks"
import { Navigate } from "react-router-dom"
import { userUrl } from "../constants/api"
import { AppDispatch } from "../../types"
import { InitialUserAuth, UserAuth } from "./reducer/auth"
import { Dispatch, SetStateAction } from "react"

export const storeAuth = async (token: string) => {
	localStorage.setItem("authToken", token)
}

export const setUserInfos = async (
	token: string,
	dispatch: AppDispatch,
	setUserAuth: Dispatch<SetStateAction<UserAuth>>) => {
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

	// TODO: check why token is a string != just null
	if (token !== 'null')
		return setUserAuth({
			email: userInfos.email,
			username: userInfos.username,
			authToken: token,
			isLogin: true,
		})
	return setUserAuth(InitialUserAuth)
}

export const checkId = (id: string, dispatch: AppDispatch) => {
	console.log('check id with args')
	if (id.includes("@")) dispatch({ type: "SET_USER", nextUsername: null, nextEmail: id })
	else dispatch({ type: "SET_USER", nextUsername: id, nextEmail: null })
}

const rmAuth = () => {
	localStorage.removeItem("authToken")
}

export const handleSignout = async (setUserAuth) => {
	const userToken = localStorage.getItem("authToken")

	await useFetch(
		signoutUrl,
		"POST",
		{ headers: { Authorization: `Bearer ${userToken}` } },
		null
	)
		.then(() => rmAuth())
		.then(() => setUserAuth(InitialUserAuth))

	return <Navigate to="/" />
}
