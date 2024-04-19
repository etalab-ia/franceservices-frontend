import Input from '@codegouvfr/react-dsfr/Input'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import type { formDataTypes } from './ContactForm'

export function UserInformation({
  setFormData,
  formData,
}: {
  setFormData: React.Dispatch<React.SetStateAction<formDataTypes>>
  formData: formDataTypes
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData: formDataTypes) => ({
      ...prevData,
      [name]: value,
    }))
  }
  return (
    <>
      <GlobalRowContainer extraClass="fr-mb-2w">
        <GlobalColContainer>
          <Input
            label="Prénom / Nom"
            nativeInputProps={{
              name: 'name',
              onChange: handleChange,
              value: formData.name,
            }}
          />
        </GlobalColContainer>
        <GlobalColContainer>
          <Input
            label="Votre administration"
            nativeInputProps={{
              name: 'administration',
              onChange: handleChange,
              value: formData.administration,
            }}
          />
        </GlobalColContainer>
      </GlobalRowContainer>
      <GlobalRowContainer extraClass="fr-mb-2w">
        <GlobalColContainer>
          <Input
            label="Titre du message"
            nativeInputProps={{
              name: 'title',
              onChange: handleChange,
              value: formData.title,
            }}
          />
        </GlobalColContainer>
      </GlobalRowContainer>
    </>
  )
}
