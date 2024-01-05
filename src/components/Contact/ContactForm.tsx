import { useEffect, useState } from "react"
import { ContactButton } from "./ContactButton"
import { UserInformation } from "./UserInformation"
import { UserMessage } from "./UserMessage"

export type formDataTypes = {
	title: string
	administration: string
	message: string
	name: string
	isCompleted: boolean
}

export function ContactForm() {
	const [formData, setFormData] = useState<formDataTypes>({
		title: "",
		administration: "",
		message: "",
		name: "",
		isCompleted: false,
	})

	useEffect(() => {
		if (
			formData.title.length &&
			formData.administration.length &&
			formData.message.length &&
			formData.name.length
		)
			setFormData((prevData) => ({ ...prevData, isCompleted: true }))
		else setFormData((prevData) => ({ ...prevData, isCompleted: false }))
	}, [formData.title, formData.administration, formData.message, formData.name])

	return (
		<div className="fr-mx-10w">
			<UserInformation formData={formData} setFormData={setFormData} />
			<UserMessage message={formData.message} setFormData={setFormData} />
			<ContactButton formData={formData} setFormData={setFormData} />
		</div>
	)
}
