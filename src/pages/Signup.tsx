import { userUrl } from '@api'
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { initButtonsSignup } from '@constants/connexion'
import { signupFields } from '@constants/inputFields'
import { useState } from 'react'
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
import { LoginFields } from '../components/Auth/LoginFields'
import { ButtonInformation } from '../components/Global/ButtonInformation'

const SignupSchema = object(
  {
    username: string("Le nom d'utilisateur est invalide.", [
      custom(
        (username) => !username.includes('@'),
        "Le nom d'utilisateur ne doit pas contenir '@'."
      ),
    ]),
    email: string('Adresse email valide', [email('Adresse email invalide.')]),
    matricule: string('Le matricule est invalide.', [
      minLength(1, 'Veuillez selectionner une maison France Services'),
    ]),
    password: string('Le mot de passe est invalide.', [
      minLength(8, 'Le mot de passe doit contenir au moins 8 charactères.'),
      maxLength(20, 'Le mot de passe doit contenir au plus 20 charactères.'),
      regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre.'),
      regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir un charactère spécial.'),
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
export function Signup({ authFailed, setAuthFailed, userAuth, setUserAuth }) {
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [errorMesage, setErrorMessage] = useState('')
  const [selectedMFS, setSelectedMFS] = useState('')
  const [selectedMatricule, setSelectedMatricule] = useState('')
  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.name === 'username')
      setUserAuth({
        ...userAuth,
        username: e.target.value,
      })
    else if (e.target.name === 'password') setPassword(e.target.value)
    else if (e.target.name === 'confirmationPassword') setConfPassword(e.target.value)
    else if (e.target.name === 'email')
      setUserAuth({
        ...userAuth,
        email: e.target.value,
      })
  }

  const handleValidatePassword = (auth) => {
    return (
      userAuth.username &&
      userAuth.username.length &&
      userAuth.email.length &&
      userAuth.email.includes('@') &&
      password.length &&
      confPassword === password
    )
  }

  const handleClick = async () => {
    const data = {
      username: userAuth.username,
      email: userAuth.email,
      password: password,
      france_services: selectedMFS,
      matricule: selectedMatricule,
    }

    try {
      parse(SignupSchema, { ...data, confirmationPassword: confPassword })
    } catch (error) {
      console.error('Validation error:', error)
      setErrorMessage(error.message)
      setAuthFailed(true)
      return
    }

    try {
      const res = await useFetch(userUrl, 'POST', {
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.success) {
        switch (res.error.details.detail) {
          case 'Username already exists':
            setErrorMessage("Nom d'utilisateur déjà utilisé")
            break
          case 'Email already exists':
            setErrorMessage('Email déjà utilisé')
            break
          default:
            setErrorMessage('Une erreur est survenue')
            break
        }
        setAuthFailed(true)
      } else {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setAuthFailed(true)
    }
  }

  return (
    <div className="fr-container">
      <div className="max-w-[50%]">
        <h1 className="fr-text-title--blue-france fr-mt-5w fr-mb-2w">
          Créer votre compte
        </h1>
        <p className="fr-mb-4w">
          Créer votre compte en quelques instant pour utiliser Albert France services.
        </p>
        <LoginFields
          fields={signupFields}
          handleChange={handleChange}
          selectedValue={selectedMFS}
          setSelectedValue={setSelectedMFS}
          matricule={selectedMatricule}
          setMatricule={setSelectedMatricule}
          handleSubmit={handleClick}
        />
        {authFailed && <ButtonInformation>{errorMesage}</ButtonInformation>}
        <ButtonsGroup
          buttons={initButtonsSignup(
            handleValidatePassword,
            handleClick,
            'Créer un compte'
          )}
        />
      </div>
    </div>
  )
}

const useFetch = async (url, method, props) => {
  const { data, headers } = props
  try {
    const response = await fetch(url, {
      method: method,
      credentials: 'include',
      headers,
      body: data === undefined ? null : data,
    })

    if (!response.ok) {
      // Parsing the response body to access detailed information
      const errorDetails = await response.json()
      return {
        success: false,
        error: {
          status: response.status,
          statusText: response.statusText,
          details: errorDetails,
        },
      }
    }

    const responseData = url.includes('start') ? response : await response.json()
    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    console.error('An error occurred: ', error)
    return {
      success: false,
      error: error.message || 'Unknown error occurred',
    }
  }
}
