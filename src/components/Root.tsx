import { Badge } from '@codegouvfr/react-dsfr/Badge'
import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import { Footer } from '@codegouvfr/react-dsfr/Footer'
import { Header } from '@codegouvfr/react-dsfr/Header'
import { quickAccessItemsFunc } from '@constants/header'
import { navFunc } from '@constants/router'
import { InitialUserAuth, type UserAuth } from '@utils/auth'
import { isMFSContext } from '@utils/context/isMFSContext'
import { Login } from 'pages/Login'
import { useContext, useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from '../pages/404'
import { Chatbot } from '../pages/Chatbot'
import { Contact } from '../pages/Contact'
import { FAQ } from '../pages/FAQ'
import { Home } from '../pages/Home'
import { Meeting } from '../pages/Meeting'
import { NewPassword } from '../pages/NewPassword'
import { ResetPassword } from '../pages/ResetPassword'
import { Signup } from '../pages/Signup'
import { Tools } from '../pages/Tools'

export const Root = () => {
  const location = useLocation()
  const navigationData = navFunc()
  const [userAuth, setUserAuth] = useState<UserAuth>(InitialUserAuth)
  const [authFailed, setAuthFailed] = useState(false)
  const isMFS = useContext(isMFSContext)
  const auth = useAuth()
  return (
    <div className="h-screen w-screen flex-col justify-between" id="screen">
      <Header
        brandTop="DINUM / Etalab"
        homeLinkProps={{
          href: '/home',
          title: 'Accueil - Albert',
        }}
        serviceTitle={
          <>
            ALBERT {isMFS ? 'France services' : 'Chat'}{' '}
            <Badge as="span" noIcon severity="success">
              Beta
            </Badge>
          </>
        }
        serviceTagline={
          isMFS ? 'Aide à l’accompagnement des usagers France services' : ''
        }
        navigation={auth.isAuthenticated && navigationData}
        quickAccessItems={quickAccessItemsFunc()}
      />
      <Routes>
        <Route
          path="/login"
          element={auth.isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />

        {isMFS ? (
          <Route path="/FAQ" element={<FAQ />} />
        ) : (
          <Route path="/FAQ" element={<Error404 />} />
        )}
        {isMFS && (
          <>
            <Route path="/meeting" element={<ProtectedRoute component={Meeting} />} />
            <Route path="/meeting/:id" element={<ProtectedRoute component={Meeting} />} />
            <Route path="/outils" element={<ProtectedRoute component={Tools} />} />
          </>
        )}
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/404" element={<Error404 />} />
        {!isMFS ? (
          <Route path="/chat" element={<ProtectedRoute component={Chatbot} />} />
        ) : (
          <Route path="/chat" element={<Navigate to="/404" />} />
        )}
        <Route path="/contact" element={<ProtectedRoute component={Contact} />} />
        <Route
          path="/signup"
          element={
            <Signup
              authFailed={authFailed}
              setAuthFailed={setAuthFailed}
              userAuth={userAuth}
              setUserAuth={setUserAuth}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPassword
              setAuthFailed={setAuthFailed}
              userAuth={userAuth}
              setUserAuth={setUserAuth}
            />
          }
        />
        <Route
          path="/new-password"
          element={<NewPassword authFailed={authFailed} setAuthFailed={setAuthFailed} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>

      {!location.pathname.includes('meeting') && location.pathname !== '/chat' && (
        <Footer
          bottomItems={[headerFooterDisplayItem]}
          accessibility="partially compliant"
          termsLinkProps={{
            href: '#',
          }}
        />
      )}
    </div>
  )
}

const ProtectedRoute = ({ component: Component, ...props }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return <Component {...props} />
}
