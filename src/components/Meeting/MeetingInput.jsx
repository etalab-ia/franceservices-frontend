import Input from "@codegouvfr/react-dsfr/Input";

export function MeetingInput({ field }) {
	return <Input
		label={field.label}
		style={{ marginBottom: 0}}
		className="fr-mb-1w"
		nativeInputProps={{
			name: field.name
		}}
	/>
}