import { signinUrl } from '@api'
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { initButtonsLogin } from '@constants/connexion'
import { loginFields } from '@constants/inputFields'
import { isMFSContext } from '@utils/context/isMFSContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import { LoginFields } from '../components/Auth/LoginFields'
import { useAuth } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'
import { ButtonInformation } from 'components/Global/ButtonInformation'
import { usernameOrPasswordError } from '@constants/errorMessages'
import { set } from 'valibot'

export function Login() {
  const [isDisable, setIsDisable] = useState(true)
  const [authFailed, setAuthFailed] = useState(false)
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const isMFS = useContext(isMFSContext)
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    checkIfCompletedFields()
  }, [password, id])

  const checkIfCompletedFields = useCallback(() => {
    setIsDisable(!(password.length && id.length && password.length >= 8))
  }, [password, id])

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.name === 'username') {
      setId(e.target.value)
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async () => {
    const data = id.includes('@')
      ? { email: id, password: password }
      : { username: id, password: password }

    try {
      const res = await useFetch(signinUrl, 'POST', {
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.status === 422) {
        setAuthFailed(true)
      } else if (res.status && res.success !== true) {
        setAuthFailed(res.status)
      } else {
        const user = await auth.signinResourceOwnerCredentials({
          username: id,
          password: password,
        })
        navigate('/home')
      }
    } catch (error) {
      setAuthFailed(true)
    }
  }

  return (
    <div className="fr-container fr-mb-8w">
      <div className="fr-grid-row">
        <div className="fr-col fr-col-md-6">
          <h1 className="fr-text-title--blue-france fr-mt-5w fr-mb-2w">Se connecter</h1>
          {isMFS && (
            <p className="fr-mb-4w">
              Ce service est à destination des France services participant à
              l’expérimentation Albert France services.
            </p>
          )}
          <LoginFields
            fields={loginFields}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {(authFailed || auth.error) && (
            <ButtonInformation>{usernameOrPasswordError}</ButtonInformation>
          )}
          <ButtonsGroup buttons={initButtonsLogin(handleSubmit, isDisable)} />
        </div>
      </div>
    </div>
  )
}

const useFetch = async (url: string, method: string, props): Promise<any> => {
  const { data, headers } = props
  try {
    const response = await fetch(url, {
      method: method,
      headers,
      body: data === undefined ? '' : data,
    })

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`)
    }

    if (url.includes('start')) return response
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error('An error occurred: ', error)
    throw error
  }
}
