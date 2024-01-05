import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from "react"
import { ContactButton } from "./ContactButton"
import { UserInformation } from "./UserInformation"
import { UserMessage } from "./UserMessage"
import { UserAuth } from "src/utils/auth"

export function ContactForm({ setUserAuth }: { setUserAuth: Dispatch<SetStateAction<UserAuth>> }) {
	const [title, setTitle] = useState<string>("")
	const [administration, setAdministration] = useState<string>("")
	const [message, setMessage] = useState<string>("")
	const [name, setName] = useState<string>("")
	const [isCompleted, setIsCompleted] = useState<boolean>(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (e.target.name === "title") setTitle(e.target.value)
		else if (e.target.name === "administration") setAdministration(e.target.value)
		else if (e.target.name === "name") setName(e.target.value)
		else setMessage(e.target.value)
	}

	useEffect(() => {
		if (title.length && administration.length && message.length && name.length) setIsCompleted(true)
	}, [title, administration, message, name])

	return (
		<div className="fr-mx-10w">
			<UserInformation handleChange={handleChange} />
			<UserMessage handleChange={handleChange} />
			<ContactButton
				isDisable={!isCompleted}
				administration={administration}
				title={title}
				message={message}
				name={name}
				setUserAuth={setUserAuth}
			/>
		</div>
	)
}
