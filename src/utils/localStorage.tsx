import { setUserInfos } from "./manageConnexion"
import { UserAuth } from "./auth"
import { Dispatch, SetStateAction } from "react"

export function checkConnexion(setUserAuth: Dispatch<SetStateAction<UserAuth>>) {
	return new Promise<void>((resolve) => {
		const authToken = localStorage.getItem("authToken")
		if (authToken) {
			setUserInfos(authToken, setUserAuth)
				.then(resolve)
				.catch(() => resolve())
		} else {
			resolve()
		}
	})
}
