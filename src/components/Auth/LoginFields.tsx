import Input from '@codegouvfr/react-dsfr/Input'
import { PasswordInput } from '@codegouvfr/react-dsfr/blocks/PasswordInput'

export const LoginFields = ({ fields, handleChange, handleSubmit }) => {
  function handleKeyDown(e: any) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <>
      {fields.map((field, key) => {
        return field.nativeInputProps.type !== 'password' ? (
          <Input
            label={field.label}
            key={key}
            hintText={field.hintText}
            nativeInputProps={{
              ...field.nativeInputProps,
              onChange: handleChange,
              onKeyDown: { handleKeyDown },
            }}
          />
        ) : (
          <PasswordInput
            label={field.label}
            key={key}
            hintText={field.hintText}
            nativeInputProps={{
              ...field.nativeInputProps,
              onChange: handleChange,
              onKeyDown: {},
            }}
          />
        )
      })}
    </>
  )
}
