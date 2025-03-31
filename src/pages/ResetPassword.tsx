import { resetPasswordMailUrl } from '@api'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import Input from '@codegouvfr/react-dsfr/Input'
import { Notice } from '@codegouvfr/react-dsfr/Notice'
import { initButtonsReset } from '@constants/connexion'
import { useFetch } from '@utils/hooks'
import { useState } from 'react'
import { LoginContainer } from '../components/Auth/LoginContainer'

function AlertNotice() {
  return (
    <div className="fr-notice fr-notice--error">
      <div className="fr-container">
        <div className="fr-notice__body">
          <p>
            <span className="fr-notice__title">
              Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export function ResetPassword({ setAuthFailed, userAuth, setUserAuth }) {
  const [showSuccessNotice, setShowSuccessNotice] = useState(false)
  const [showErrorNotice, setShowErrorNotice] = useState(false)
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email) {
      return 'Veuillez saisir une adresse email'
    }
    if (!emailRegex.test(email)) {
      return 'Veuillez saisir une adresse email valide'
    }
    return ''
  }

  const handleChange = (e) => {
    e.preventDefault()
    const email = e.target.value
    setUserAuth({ email })
    setEmailError(validateEmail(email))
  }

  const isValidEmail = userAuth.email && !emailError

  const handleClick = async () => {
    const validationError = validateEmail(userAuth.email)
    if (validationError) {
      setEmailError(validationError)
      return
    }

    try {
      const res = await useFetch(resetPasswordMailUrl, 'POST', {
        data: JSON.stringify({ email: userAuth.email }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.status && res.status !== 200) {
        setAuthFailed(true)
        setShowErrorNotice(true)
        return
      }

      setShowSuccessNotice(true)
      setTimeout(() => {
        window.location.href = '/login'
      }, 3000)
    } catch (error) {
      setAuthFailed(true)
      setShowErrorNotice(true)
    }
  }

  return (
    <LoginContainer>
      <Input
        hintText="Email"
        nativeInputProps={{
          placeholder: 'camille@mail.com',
          onChange: handleChange,
          value: userAuth.email,
        }}
        label="Email"
        state={emailError ? 'error' : 'default'}
        stateRelatedMessage={emailError}
      />
      <ButtonsGroup buttons={initButtonsReset(!isValidEmail, handleClick)} />

      {showSuccessNotice && (
        <div className="fr-mt-2w">
          <Notice title="Un email de réinitialisation de mot de passe vous a été envoyé. Vous allez être redirigé vers la page de connexion." />
        </div>
      )}

      {showErrorNotice && (
        <div className="fr-mt-2w">
          <AlertNotice />
        </div>
      )}
    </LoginContainer>
  )
}
