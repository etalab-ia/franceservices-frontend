import { resetPasswordUrl } from '@api'
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { initButtonsSignup } from '@constants/connexion'
import { changePasswordFailed } from '@constants/errorMessages'
import { signupFields } from '@constants/inputFields'
import { useFetch } from '@utils/hooks'
import ShowError from 'components/Error/ShowError'
import { useState } from 'react'
import { LoginContainer } from '../components/Auth/LoginContainer'
import { LoginFields } from '../components/Auth/LoginFields'
import { ButtonInformation } from '../components/Global/ButtonInformation'
import {
  custom,
  email,
  maxLength,
  minLength,
  object,
  parse,
  regex,
  string,
} from 'valibot'

const PasswordSchema = object(
  {
    username: string("Le nom d'utilisateur est invalide.", [
      custom(
        (username) => !username.includes('@'),
        "Le nom d'utilisateur ne doit pas contenir '@'."
      ),
    ]),
    email: string('Adresse email valide', [email('Adresse email invalide.')]),
    password: string('Le mot de passe est invalide.', [
      minLength(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
      maxLength(128, 'Le mot de passe doit contenir au plus 128 caractères.'),
      regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre.'),
      regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir un caractère spécial.'),
      regex(
        /[^A-Za-z0-9$!%*+-?&#_=.,:;@]{8,128}/,
        'Les charactères spéciaux autorisés sont $!%*+-?&#_=.,:;@'
      ),
    ]),
    confirmationPassword: string(
      'La confirmation du mot de passe doit être une chaîne valide.'
    ),
  },
  [
    custom(
      (data) => data.password === data.confirmationPassword,
      'Les deux mots de passe doivent etre identiques'
    ),
  ]
)
export function NewPassword({ authFailed, setAuthFailed }) {
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const urlParams = new URL(window.location.href)
  const token = urlParams.searchParams.get('token')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.name === 'passwordSignup') setPassword(e.target.value)
    else if (e.target.name === 'confirmationPassword') setConfPassword(e.target.value)
  }

  const handleValidatePassword = () => {
    return password.length && confPassword === password
  }

  const handleClick = async () => {
    try {
      const data = {
        password: password,
        confirmationPassword: confPassword,
      }
      await parse(PasswordSchema, data)
    } catch (error) {
      console.error('Validation error:', error)
      setErrorMessage(error.message)
      return
    }
    const data = {
      token: token,
      password: password,
    }
    const res = await useFetch(resetPasswordUrl, 'POST', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.status && res.status !== 200) setAuthFailed(true)

    return (window.location.href = '/login')
  }
  const fields = signupFields.slice(2, signupFields.length)

  /*   if (!token)
    return (
      <div className="fr-container">
        <ShowError message={'Token invalide, veuillez contacter notre équipe'} />
      </div>
    ) */

  return (
    <LoginContainer>
      <LoginFields
        handleSubmit={handleClick}
        fields={fields}
        handleChange={handleChange}
      />
      {errorMessage && <ButtonInformation>{errorMessage}</ButtonInformation>}

      {authFailed && <ButtonInformation>{changePasswordFailed}</ButtonInformation>}
      <ButtonsGroup
        buttons={initButtonsSignup(
          handleValidatePassword,
          handleClick,
          'Changer de mot de passe'
        )}
      />
    </LoginContainer>
  )
}
