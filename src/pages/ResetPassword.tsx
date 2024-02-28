import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import Input from '@codegouvfr/react-dsfr/Input'
import { LoginContainer } from '../components/Auth/LoginContainer'
import { useApiUrls } from '../constants/api'
import { initButtonsReset } from '../constants/connexion'
import { useFetch } from '../utils/hooks'

export function ResetPassword({ setAuthFailed, userAuth, setUserAuth }) {
  const handleChange = (e) => {
    e.preventDefault()

    setUserAuth({ email: e.target.value })
  }

  const isValidEmail = userAuth.email.length && userAuth.email.includes('@')
  const { resetPasswordMailUrl } = useApiUrls()
  const handleClick = async () => {
    const res = await useFetch(resetPasswordMailUrl, 'POST', {
      data: JSON.stringify({ email: userAuth.email }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.status && res.status !== 200) setAuthFailed(true)

    return (window.location.href = '/login')
  }

  return (
    <LoginContainer>
      <Input
        hintText="Email"
        nativeInputProps={{
          placeholder: 'camille@mail.com',
          onChange: handleChange,
        }}
        label="Email"
      />
      <ButtonsGroup buttons={initButtonsReset(!isValidEmail, handleClick)} />
    </LoginContainer>
  )
}
