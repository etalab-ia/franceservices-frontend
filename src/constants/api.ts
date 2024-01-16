import React, { useContext } from "react"
import { isMFSContext } from "../utils/context/isMFSContext"

// We need a hook to dynamically set apiBase based on if user is on MFS or not
export const useApiUrls = () => {
	const isMFS = useContext(isMFSContext)

	// Set apiBase based on isMFS
	const apiBase = isMFS
		? "https://franceservices.etalab.gouv.fr/api/v2"
		: "https://albert.etalab.gouv.fr/api/v2"

	//const apiBase = "https://albert.etalab.gouv.fr/api/v2"

	const streamUrl = apiBase + "/stream"
	const chatUrl = apiBase + "/chat"
	const getChatsUrl = apiBase + "/chats?desc=true"
	const getStreamsUrl = apiBase + "/chat/archive"
	const indexesUrl = apiBase + "/indexes"
	const institutionsUrl = apiBase + "/institutions"
	const signinUrl = apiBase + "/sign_in"
	const signoutUrl = apiBase + "/sign_out"
	const resetPasswordMailUrl = apiBase + "/send_reset_password_email"
	const resetPasswordUrl = apiBase + "/reset_password"
	const userUrl = apiBase + "/user/me"
	const contactUrl = apiBase + "/user/contact"
	const feedbackUrl = apiBase + "/feedback/add"
	const getSheetsUrl = apiBase + "/get_sheets"
	const getChunksUrl = apiBase + "/get_chunks"
	const importUrl =
		"https://opendata.plus.transformation.gouv.fr/api/explore/v2.1/catalog/datasets/export-expa-c-riences/records?limit=5"

	return {
		streamUrl,
		chatUrl,
		getChatsUrl,
		getStreamsUrl,
		indexesUrl,
		institutionsUrl,
		signinUrl,
		signoutUrl,
		resetPasswordMailUrl,
		resetPasswordUrl,
		userUrl,
		contactUrl,
		feedbackUrl,
		getSheetsUrl,
		getChunksUrl,
		importUrl,
		apiBase,
	}
}
