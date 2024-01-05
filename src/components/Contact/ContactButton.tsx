import { useState, Dispatch, SetStateAction } from "react"
import Button from "@codegouvfr/react-dsfr/Button"
import { ButtonInformation } from "../Global/ButtonInformation"
import { contactUrl } from "../../constants/api"
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
		isCompleted: boolean
	}
	setFormData: (data: any) => void
	setUserAuth: Dispatch<SetStateAction<UserAuth>>
}

export function ContactButton({ formData, setFormData, setUserAuth }: ContactButtonProps) {
	const [isSend, setIsSend] = useState(false)

	const handleClick = async () => {
		const userToken = localStorage.getItem("authToken")

		setUserInfos(userToken, setUserAuth)

		await useFetch(
			contactUrl,
			"POST",
			{
				data: setContactData(
					formData.title + " from: " + formData.name,
					formData.message,
					formData.administration
				),
				headers: setHeaders(userToken, false),
			},
		)
		console.log("Message envoyé")
		setFormData({ title: "", administration: "", message: "", name: "" })
		setIsSend(true)
	}

	return (
		<>
			{isSend && (
				<ButtonInformation>
					Votre message a bien été envoyé, merci pour votre retour !
				</ButtonInformation>
			)}
			<Button onClick={handleClick} disabled={!formData.isCompleted}>
				Envoyer
			</Button>
		</>
	)
}
