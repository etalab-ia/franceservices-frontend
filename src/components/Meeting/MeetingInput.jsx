import Input from "@codegouvfr/react-dsfr/Input";

export function MeetingInput({ field }) {
	return <Input
		label={field.label}
		nativeInputProps={{
			name: field.name
		}}
	/>
}