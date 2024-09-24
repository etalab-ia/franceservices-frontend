import { contactUrl } from '@api'
import Button from '@codegouvfr/react-dsfr/Button'
import { useFetch } from '@utils/hooks'
import { setContactData, setHeaders } from '@utils/setData'
import { type Dispatch, type SetStateAction, useState } from 'react'
import type { UserAuth } from 'utils/auth'
import { ButtonInformation } from '../Global/ButtonInformation'

interface ContactButtonProps {
  formData: {
    title: string
    administration: string
    message: string
    name: string
  }
  clearForm: () => void
  setUserAuth: Dispatch<SetStateAction<UserAuth>>
}

export function ContactButton({ formData, clearForm, setUserAuth }: ContactButtonProps) {
  const [isSent, setIsSent] = useState(false)
  const userToken = localStorage.getItem('authToken')
  const handleClick = async () => {
    await useFetch(contactUrl, 'POST', {
      data: setContactData(
        formData.title + ' from: ' + formData.name,
        formData.message,
        formData.administration,
      ),
      headers: setHeaders(false),
    })
    clearForm()
    setIsSent(true)
  }

  const isCompleted =
    formData.title && formData.administration && formData.message && formData.name
  return (
    <>
      {isSent && (
        <ButtonInformation>
          Votre message a bien été envoyé, merci pour votre retour !
        </ButtonInformation>
      )}
      <Button onClick={handleClick} disabled={!isCompleted}>
        Envoyer
      </Button>
    </>
  )
}
