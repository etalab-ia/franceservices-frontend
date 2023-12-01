import Input from '@codegouvfr/react-dsfr/Input';

export function UserMessage({ handleChange }) {
	return (
		<Input
			label="Message"
			textArea
			nativeTextAreaProps={{
				name: "message",
				onChange: handleChange,
				style: { minHeight: 200 }
			}}
		/>
	)
}