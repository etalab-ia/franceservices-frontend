import Button from '@codegouvfr/react-dsfr/Button'
import { Dispatch, SetStateAction, useState } from 'react'
import { UserAuth } from 'utils/auth'
import { contactUrl } from '../../constants/api'
import { useFetch } from '../../utils/hooks'
import { setContactData, setHeaders } from '../../utils/setData'
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
  const [isSend, setIsSend] = useState(false)
  const userToken = localStorage.getItem('authToken')
  const handleClick = async () => {
    //setUserInfos(userToken, setUserAuth, userUrl)
    await useFetch(contactUrl, 'POST', {
      data: setContactData(
        formData.title + ' from: ' + formData.name,
        formData.message,
        formData.administration
      ),
      headers: setHeaders(false),
    })
    clearForm()
    setIsSend(true)
  }

  const isCompleted =
    formData.title && formData.administration && formData.message && formData.name
  return (
    <>
      {isSend && (
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
