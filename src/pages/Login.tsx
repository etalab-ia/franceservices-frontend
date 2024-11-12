// import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
// import { initButtonsLogin } from '@constants/connexion'
// import { loginFields } from '@constants/inputFields'
// import {
//   type Dispatch,
//   type SetStateAction,
//   useCallback,
//   useEffect,
//   useState,
// } from 'react'
// import { LoginFields } from '../components/Auth/LoginFields'
// import { ButtonInformation } from '../components/Global/ButtonInformation'
// import { useNavigate } from 'react-router-dom'

// interface LoginProps {
//   authFailed: boolean
//   setAuthFailed: Dispatch<SetStateAction<boolean>>
// }

// export function Login({ authFailed, setAuthFailed }: LoginProps) {
//   const [isDisable, setIsDisable] = useState(true)
//   const [password, setPassword] = useState('')
//   const [id, setId] = useState('')
//   // { login, isAuthenticated } = useAuth()
//   const navigate = useNavigate()
//   // useEffect(() => {
//   //   if (isAuthenticated) {
//   //     navigate('/meeting', { replace: true })
//   //   }
//   // }, [isAuthenticated, navigate])
//   useEffect(() => {
//     checkIfCompletedFields()
//   }, [password, id])

//   const checkIfCompletedFields = useCallback(() => {
//     setIsDisable(!(password.length && id.length))
//   }, [password, id])

//   const handleChange = (e) => {
//     e.preventDefault()
//     if (e.target.name === 'username') {
//       setId(e.target.value)
//     }
//     if (e.target.name === 'password') {
//       setPassword(e.target.value)
//     }
//   }

//   const handleSubmit = async () => {
//     setAuthFailed(false)
//   //   try {
//   //     const success = await login(id, password)
//   //     if (!success) {
//   //       setAuthFailed(true)
//   //     }
//   //   } catch (error) {
//   //     setAuthFailed(true)
//   //   }
//   // }

//   return (
//     <div className="fr-container fr-mb-8w">
//       <div className="fr-grid-row">
//         <div className="fr-col fr-col-md-6">
//           <h1 className="fr-text-title--blue-france fr-mt-5w fr-mb-2w">Se connecter</h1>
//           <p className="fr-mb-4w">
//             Ce service est à destination des France services participant à
//             l'expérimentation Albert France services.
//           </p>
//           <LoginFields
//             fields={loginFields}
//             handleChange={handleChange}
//             handleSubmit={handleSubmit}
//             selectedValue={undefined}
//             setSelectedValue={undefined}
//             matricule={undefined}
//             setMatricule={undefined}
//           />
//           {authFailed && (
//             <ButtonInformation>
//               Nom d'utilisateur ou mot de passe invalide.
//             </ButtonInformation>
//           )}
//           <ButtonsGroup buttons={initButtonsLogin(handleSubmit, isDisable)} />
//         </div>
//       </div>
//     </div>
//   )
// }
