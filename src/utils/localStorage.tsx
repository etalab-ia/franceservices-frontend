import { AppDispatch } from "types"
import { setUserInfos } from "./manageConnexion"
import { UserAuth } from "./reducer/auth"
import { Dispatch, SetStateAction } from "react"

export function checkConnexion(dispatch: AppDispatch, setUserAuth: Dispatch<SetStateAction<UserAuth>>) {
	const authToken = localStorage.getItem("authToken")

	setUserInfos(authToken, dispatch, setUserAuth)
}