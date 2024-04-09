import { userUrl } from '@api'
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { initButtonsSignup } from '@constants/connexion'
import { signupFields } from '@constants/inputFields'
import { useEffect, useMemo, useState } from 'react'
import { custom, email, object, parse, regex, string, minLength } from 'valibot'
import { LoginContainer } from '../components/Auth/LoginContainer'
import { LoginFields } from '../components/Auth/LoginFields'
import { ButtonInformation } from '../components/Global/ButtonInformation'
import Fuse from 'fuse.js'
import Input from '@codegouvfr/react-dsfr/Input'

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
    matricule: string('Le matricule est invalide.', [
      minLength(8, 'Veuillez selectionner une maison France Services'),
    ]),
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
      <LoginFields fields={signupFields} handleChange={handleChange} />
      {authFailed && <ButtonInformation>{errorMesage}</ButtonInformation>}
      <MFSInput
        selectedValue={selectedMFS}
        setSelectedValue={setSelectedMFS}
        matricule={selectedMatricule}
        setMatricule={setSelectedMatricule}
      />{' '}
      <ButtonsGroup
        buttons={initButtonsSignup(
          handleValidatePassword,
          handleClick,
          'Créer un compte'
        )}
      />
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

const options = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.2,
  keys: ['name'],
}

export function MFSInput({
  selectedValue,
  setSelectedValue,
  matricule,
  setMatricule,
}: {
  selectedValue: string
  setSelectedValue: any
  matricule: string
  setMatricule: any
}) {
  const [searchResults, setSearchResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  console.log('value', selectedValue)
  const fuse = useMemo(() => new Fuse(maisonsFranceServiceType, options), [])

  const handleSearch = (e) => {
    const value = e.target.value
    setSelectedValue(value)
    setSelectedIndex(-1)
    setSearchResults(value ? fuse.search(value).map((result) => result.item) : [])
    setMatricule('')
  }

  const handleKeyDown = (e) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()
      const newIndex =
        e.key === 'ArrowDown'
          ? Math.min(selectedIndex + 1, searchResults.length - 1)
          : Math.max(selectedIndex - 1, 0)
      if (newIndex >= 0 && newIndex <= 4) {
        setSelectedIndex(newIndex)
        setSelectedValue(searchResults[newIndex]?.name || '')
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selectedResult = searchResults[selectedIndex]
      if (selectedResult) {
        handleSelect(selectedResult)
      } else {
        handleSelect(selectedValue)
        resetSelection()
      }
    }
  }

  const handleSelect = (result) => {
    setSelectedValue(result.name)
    setMatricule(result.matricule)
    resetSelection()
  }

  const resetSelection = () => {
    //  setSelectedValue('')
    setSearchResults([])
    setSelectedIndex(-1)
  }

  return (
    <div className="fr-grid-row">
      <div>
        <Input
          label="Maison France Services"
          className="fr-mb-1w"
          nativeInputProps={{
            onChange: handleSearch,
            onKeyDown: handleKeyDown,
            value: selectedValue,
            name: 'mfs',
            tabIndex: 0,
          }}
        />
        <div tabIndex={-1} className="fr-mb-2v">
          {searchResults.slice(0, 5).map((result, index) => (
            <div
              className={`fr-card cursor-pointer p-0 ${
                selectedIndex === index ? 'bg-light-grey' : ''
              }`}
              key={result.name}
              onClick={() => handleSelect(result)}
            >
              <p className="fr-ml-3w fr-mt-1w fr-mb-1w">{result.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Input
        label="Matricule"
        className="fr-mb-1w"
        nativeInputProps={{ value: matricule }}
        disabled
      />
    </div>
  )
}

const maisonsFranceServiceType = [
  { name: 'test', matricule: '123456789' },
  { name: 'test2', matricule: 'hjkhk' },
  { name: 'onoo', matricule: 'kjhhi' },
]
