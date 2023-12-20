import Input from "@codegouvfr/react-dsfr/Input";
import { PasswordInput } from "@codegouvfr/react-dsfr/blocks/PasswordInput";

export const    LoginFields = ({ fields, handleChange }) => {
	return <>
		{fields.map((field, key) => {
			return field.nativeInputProps.type !== 'password' ?
			<Input
				label={field.label}
				key={key}
				hintText={field.hintText}
				nativeInputProps={{...field.nativeInputProps, onChange: handleChange}}
			/>
			:
			<PasswordInput
				label={field.label}
				key={key}
				hintText={field.hintText}
				nativeInputProps={{...field.nativeInputProps, onChange: handleChange}}
			/>
		})}
	</>
}