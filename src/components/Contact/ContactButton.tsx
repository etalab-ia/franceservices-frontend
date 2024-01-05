import { useState, Dispatch, SetStateAction } from "react"
import Button from "@codegouvfr/react-dsfr/Button"
import { ButtonInformation } from "../Global/ButtonInformation"
import { contactUrl } from "../../constants/api"
import { useDispatch } from "react-redux"
import { setContactData, setHeaders } from "../../utils/setData"
import { setUserInfos } from "../../utils/manageConnexion"
import { useFetch } from "../../utils/hooks"
import { UserAuth } from "src/utils/reducer/auth"

interface ContactButtonProps {
	isDisable: boolean
	administration: string
	message: string
	name: string
	title: string
	setUserAuth: Dispatch<SetStateAction<UserAuth>>
}

export function ContactButton({
	isDisable,
	administration,
	message,
	name,
	title,
	setUserAuth,
}: ContactButtonProps) {
	const [isSend, setIsSend] = useState(false)
	const dispatch = useDispatch()

	const handleClick = async () => {
		const userToken = localStorage.getItem("authToken")

		setUserInfos(userToken, dispatch, setUserAuth)

		await useFetch(
			contactUrl,
			"POST",
			{
				data: setContactData(title + " from: " + name, message, administration),
				headers: setHeaders(userToken, false),
			},
			dispatch
		)

		setIsSend(true)
	}

	return (
		<>
			{isSend && (
				<ButtonInformation>
					Votre message a bien été envoyé, merci pour votre retour !
				</ButtonInformation>
			)}
			<Button onClick={handleClick} disabled={isDisable}>
				Envoyer
			</Button>
		</>
	)
}