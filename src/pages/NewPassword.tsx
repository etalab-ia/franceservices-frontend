import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { useState } from 'react'
import { LoginContainer } from '../components/Auth/LoginContainer'
import { LoginFields } from '../components/Auth/LoginFields'
import { ButtonInformation } from '../components/Global/ButtonInformation'
import { useApiUrls } from '../constants/api'
import { initButtonsSignup } from '../constants/connexion'
import { changePasswordFailed } from '../constants/errorMessages'
import { signupFields } from '../constants/inputFields'
import { useFetch } from '../utils/hooks'

export function NewPassword({ authFailed, setAuthFailed }) {
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const urlParams = new URL(window.location.href)
  const token = urlParams.searchParams.get('token')
  const { resetPasswordUrl } = useApiUrls()

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.name === 'password') setPassword(e.target.value)
    else if (e.target.name === 'confirmationPassword') setConfPassword(e.target.value)
  }

  const handleValidatePassword = () => {
    return password.length && confPassword === password
  }

  const handleClick = async () => {
    const data = {
      token: token,
      password: password,
    }
    const res = await useFetch(resetPasswordUrl, 'POST', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.status && res.status !== 200) setAuthFailed(true)

    return (window.location.href = '/albert/login')
  }
  const fields = signupFields.slice(2, signupFields.length)

  return (
    <LoginContainer>
      <LoginFields fields={fields} handleChange={handleChange} />
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
