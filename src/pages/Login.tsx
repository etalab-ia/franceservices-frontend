import { signinUrl, userUrl } from '@api'
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { initButtonsLogin } from '@constants/connexion'
import { usernameOrPasswordError } from '@constants/errorMessages'
import { loginFields } from '@constants/inputFields'
import { useFetch } from '@utils/hooks'
import { setUserInfos } from '@utils/manageConnexion'
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { UserAuth } from 'utils/auth'
import { LoginFields } from '../components/Auth/LoginFields'
import { ButtonInformation } from '../components/Global/ButtonInformation'

interface LoginProps {
  authFailed: boolean
  setAuthFailed: Dispatch<SetStateAction<boolean>>
  setUserAuth: Dispatch<SetStateAction<UserAuth>>
}

export function Login({ authFailed, setAuthFailed, setUserAuth }: LoginProps) {
  const [isDisable, setIsDisable] = useState(true)
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    checkIfCompletedFields()
  }, [password, id])

  const checkIfCompletedFields = useCallback(() => {
    setIsDisable(!(password.length && id.length))
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

    setAuthFailed(false)

    try {
      const res = await useFetch(signinUrl, 'POST', {
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

      if ((res.status && res.success !== true) || !res.token) {
        // Set authFailed to true if the response status is not 200 or token is not received
        setAuthFailed(true)
      } else {
        // On successful authentication, set user info
        setUserInfos(res.token, setUserAuth, userUrl)
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

          <p className="fr-mb-4w">
            Ce service est à destination des France services participant à
            l’expérimentation Albert France services.
          </p>

          <LoginFields
            fields={loginFields}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {authFailed && <ButtonInformation>{usernameOrPasswordError}</ButtonInformation>}
          <ButtonsGroup buttons={initButtonsLogin(handleSubmit, isDisable)} />
        </div>
      </div>
    </div>
  )
}
