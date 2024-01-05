import { AppDispatch } from "types"
import { setUserInfos } from "./manageConnexion"
import { UserAuth } from "./auth"
import { Dispatch, SetStateAction } from "react"

export function checkConnexion(setUserAuth: Dispatch<SetStateAction<UserAuth>>) {
	const authToken = localStorage.getItem("authToken")

	setUserInfos(authToken, setUserAuth)
}
