import { setUserInfos } from "./manageConnexion"
import { UserAuth } from "./auth"
import { Dispatch, SetStateAction } from "react"

export function checkConnexion(setUserAuth: Dispatch<SetStateAction<UserAuth>>, userUrl: string) {
	return new Promise<void>((resolve) => {
		const authToken = localStorage.getItem("authToken")
		if (authToken) {
			setUserInfos(authToken, setUserAuth, userUrl)
				.then(resolve)
				.catch(() => resolve())
		} else {
			resolve()
		}
	})
}
