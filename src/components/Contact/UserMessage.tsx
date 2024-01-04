import Input from "@codegouvfr/react-dsfr/Input"

interface UserMessageProps {
	handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export function UserMessage({ handleChange }: UserMessageProps) {
	return (
		<Input
			label="Message"
			textArea
			nativeTextAreaProps={{
				name: "message",
				onChange: handleChange,
				style: { minHeight: 200 },
			}}
		/>
	)
}
