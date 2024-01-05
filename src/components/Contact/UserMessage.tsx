import Input from "@codegouvfr/react-dsfr/Input"

export function UserMessage({ setFormData, message } : { setFormData: any, message: string }) {
	return (
		<Input

			label="Message"
			textArea
			nativeTextAreaProps={{
				value: message,
				name: "message",
				onChange: (e) => {
					setFormData((prevData) => ({
						...prevData,
						message: e.target.value,
					}))
				},
				style: { minHeight: 200 },
			}}
		/>
	)
}
