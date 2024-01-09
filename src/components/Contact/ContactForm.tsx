import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from "react"
import { ContactButton } from "./ContactButton"
import { UserInformation } from "./UserInformation"
import { UserMessage } from "./UserMessage"

export type formDataTypes = {
	title: string
	administration: string
	message: string
	name: string
}
import { UserAuth } from "src/utils/auth"

export function ContactForm({ setUserAuth }: { setUserAuth: Dispatch<SetStateAction<UserAuth>> }) {
	const [formData, setFormData] = useState<formDataTypes>({
		title: "",
		administration: "",
		message: "",
		name: "",
	})
	const clearForm = () => {
		setFormData({ title: "", administration: "", message: "", name: "" })
	}
	return (
		<div className="fr-mx-10w">
			<UserInformation formData={formData} setFormData={setFormData} />
			<UserMessage message={formData.message} setFormData={setFormData} />
			<ContactButton setUserAuth={setUserAuth} formData={formData} clearForm={clearForm} />
		</div>
	)
}
