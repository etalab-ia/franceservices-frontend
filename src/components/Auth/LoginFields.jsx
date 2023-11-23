import Input from "@codegouvfr/react-dsfr/Input";

export const    LoginFields = ({ fields, handleChange }) => {
    return <>
        {fields.map((field, key) => {
			return <Input className="basic-width"
				label={field.label}
				iconId={field.iconId}
				key={key}
				hintText={field.hintText}
				nativeInputProps={{...field.nativeInputProps, onChange: handleChange}}
			/>
		})}
    </>
}