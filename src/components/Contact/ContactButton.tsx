import { useState, Dispatch, SetStateAction } from "react"
import Button from "@codegouvfr/react-dsfr/Button"
import { ButtonInformation } from "../Global/ButtonInformation"
import { useApiUrls } from "../../constants/api"
import { setContactData, setHeaders } from "../../utils/setData"
import { setUserInfos } from "../../utils/manageConnexion"
import { useFetch } from "../../utils/hooks"
import { UserAuth } from "src/utils/auth"

interface ContactButtonProps {
	formData: {
		title: string
		administration: string
		message: string
		name: string
	}
	clearForm: () => void
	setUserAuth: Dispatch<SetStateAction<UserAuth>>
}

export function ContactButton({ formData, clearForm, setUserAuth }: ContactButtonProps) {
	const [isSend, setIsSend] = useState(false)
	const userToken = localStorage.getItem("authToken")
	const { userUrl, contactUrl } = useApiUrls()
	const handleClick = async () => {
		//setUserInfos(userToken, setUserAuth, userUrl)
		await useFetch(contactUrl, "POST", {
			data: setContactData(
				formData.title + " from: " + formData.name,
				formData.message,
				formData.administration
			),
			headers: setHeaders(false),
		})
		clearForm()
		setIsSend(true)
	}

	const isCompleted = formData.title && formData.administration && formData.message && formData.name
	return (
		<>
			{isSend && (
				<ButtonInformation>
					Votre message a bien été envoyé, merci pour votre retour !
				</ButtonInformation>
			)}
			<Button onClick={handleClick} disabled={!isCompleted}>
				Envoyer
			</Button>
		</>
	)
}
