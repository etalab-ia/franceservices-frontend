import { InitialUserAuth, type UserAuth } from '@utils/auth'
import { useState } from 'react'
import { useAuth, withAuthenticationRequired } from 'react-oidc-context'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from '../../pages/404'
import { Contact } from '../../pages/Contact'
import { FAQ } from '../../pages/FAQ'
import { History } from '../../pages/History'
import { Meeting } from '../../pages/Meeting'
import { Signup } from '../../pages/Signup'
import { Tools } from '../../pages/Tools'
import Footer from './Footer'
import Header from './Header'
export const Root = () => {
  const auth = useAuth()
  const [userAuth, setUserAuth] = useState<UserAuth>(InitialUserAuth)
  const [redirecting, setRedirecting] = useState(false)
  const [authFailed, setAuthFailed] = useState(false)
  const location = useLocation()
  const meetingPathRegex = /^\/meeting(\/.*)?$/
  const RedirectToMeeting = () => {
    if (auth.isAuthenticated) {
      return <Navigate to="/meeting" />
    }

    if (!redirecting) {
      setRedirecting(true)
      auth.signinRedirect()
    }

    return <div>Redirecting to the authentication page...</div>
  }
  return (
    <div className="min-h-screen flex flex-col" id="screen">
      <Header auth={auth} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/meeting" />} />

          <Route path="/meeting" element={<PrivateRoute component={Meeting} />} />
          <Route path="/meeting/:id" element={<PrivateRoute component={Meeting} />} />
          <Route path="/outils" element={<PrivateRoute component={Tools} />} />
          <Route path="/history" element={<PrivateRoute component={History} />} />
          <Route path="/contact" element={<PrivateRoute component={Contact} />} />
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
          <Route path="/FAQ" element={<FAQ />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      {!meetingPathRegex.test(location.pathname) && location.pathname !== '/' && (
        <Footer />
      )}{' '}
    </div>
  )
}

const PrivateRoute = ({ component: Component, ...props }) => {
  const ComponentWithAuth = withAuthenticationRequired(Component, {
    OnRedirecting: () => <div>Redirecting to the login page...</div>,
  })

  return <ComponentWithAuth {...props} />
}
