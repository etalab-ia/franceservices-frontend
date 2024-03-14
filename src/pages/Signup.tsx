import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { useState } from 'react'
import { custom, email, object, parse, regex, string } from 'valibot'
import { LoginContainer } from '../components/Auth/LoginContainer'
import { LoginFields } from '../components/Auth/LoginFields'
import { ButtonInformation } from '../components/Global/ButtonInformation'
import { userUrl } from '@api'
import { initButtonsSignup } from '@constants/connexion'
import { signupFields } from '@constants/inputFields'

const passwordRegex = /^[A-Za-z\d$!%*+?&#_-]{8,20}$/

const SignupSchema = object(
  {
    username: string("Le nom d'utilisateur est invalide.", [
      custom(
        (username) => !username.includes('@'),
        "Le nom d'utilisateur ne doit pas contenir '@'."
      ),
    ]),
    email: string('Adresse email valide', [email('Adresse email invalide.')]),
    password: string('Le mot de passe est invalide.', [
      regex(
        passwordRegex,
        'Le mot de passe doit contenir entre 8 et 20 caractères et peut inclure des lettres, des chiffres et des caractères spéciaux ($!%*+?&#_-).'
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
export function Signup({ authFailed, setAuthFailed, userAuth, setUserAuth }) {
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [errorMesage, setErrorMessage] = useState('')

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
    <LoginContainer>
      <LoginFields fields={signupFields} handleChange={handleChange} />
      {authFailed && <ButtonInformation>{errorMesage}</ButtonInformation>}
      <ButtonsGroup
        buttons={initButtonsSignup(
          handleValidatePassword,
          handleClick,
          'Créer un compte'
        )}
      />
    </LoginContainer>
  )
}

export const useFetch = async (url, method, props) => {
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
