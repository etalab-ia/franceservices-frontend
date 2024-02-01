import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UserAuth } from 'src/utils/auth'
import { LoginContainer } from '../components/Auth/LoginContainer'
import { LoginFields } from '../components/Auth/LoginFields'
import { ButtonInformation } from '../components/Global/ButtonInformation'
import { useApiUrls } from '../constants/api'
import { initButtonsLogin } from '../constants/connexion'
import { usernameOrPasswordError } from '../constants/errorMessages'
import { loginFields } from '../constants/inputFields'
import { useFetch } from '../utils/hooks'
import { setUserInfos } from '../utils/manageConnexion'

interface LoginProps {
  authFailed: boolean
  setAuthFailed: Dispatch<SetStateAction<boolean>>
  setUserAuth: Dispatch<SetStateAction<UserAuth>>
}

export function Login({ authFailed, setAuthFailed, setUserAuth }: LoginProps) {
  const [isDisable, setIsDisable] = useState(true)
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const { signinUrl, userUrl } = useApiUrls()

  useEffect(() => {
    checkIfCompletedFields()
  }, [password])

  const checkIfCompletedFields = () => {
    if (password.length && ((id && id.length) || (password && password.length)))
      setIsDisable(false)
    else setIsDisable(true)
  }

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.name === 'username') setId(e.target.value)
    if (e.target.name === 'password') setPassword(e.target.value)

    checkIfCompletedFields()
  }

  const handleClick = async () => {
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
    <LoginContainer>
      <LoginFields fields={loginFields} handleChange={handleChange} />
      {authFailed && <ButtonInformation>{usernameOrPasswordError}</ButtonInformation>}
      <ButtonsGroup buttons={initButtonsLogin(handleClick, isDisable)} />
    </LoginContainer>
  )
}