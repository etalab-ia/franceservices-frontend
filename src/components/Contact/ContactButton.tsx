import Button from "@codegouvfr/react-dsfr/Button"
import { useState } from "react"
import { ButtonInformation } from "../Global/ButtonInformation"
import { contactUrl } from "../../constants/api"
import { useDispatch, useSelector } from "react-redux"
import { setContactData, setHeaders } from "../../utils/setData"
import { setUserInfos } from "../../utils/manageConnexion"
import { useFetch } from "../../utils/hooks"
import { RootState } from "../../../types"

interface ContactButtonProps {
	formData: {
		title: string
		administration: string
		message: string
		name: string
		isCompleted: boolean
	}
	setFormData: (data: any) => void
}

export function ContactButton({ formData, setFormData }: ContactButtonProps) {
	const [isSend, setIsSend] = useState(false)
	const auth = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()

	const handleClick = async () => {
		if (!auth.email.length || !auth.username) setUserInfos(auth.userToken, dispatch)

		await useFetch(
			contactUrl,
			"POST",
			{
				data: setContactData(
					formData.title + " from: " + formData.name,
					formData.message,
					formData.administration
				),
				headers: setHeaders(auth.userToken, false),
			},
			dispatch
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
