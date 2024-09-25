import { InitialUserAuth, type UserAuth } from '@utils/auth'
import { useAuth } from '@utils/context/authContext'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from '../../pages/404'
import { Contact } from '../../pages/Contact'
import { FAQ } from '../../pages/FAQ'
import { History } from '../../pages/History'
import { Login } from '../../pages/Login'
import { Meeting } from '../../pages/Meeting'
import { NewPassword } from '../../pages/NewPassword'
import { ResetPassword } from '../../pages/ResetPassword'
import { Signup } from '../../pages/Signup'
import { Tools } from '../../pages/Tools'
import Footer from './Footer'
import Header from './Header'
import { OidcSecure, useOidc } from '@axa-fr/react-oidc'

export const Root = () => {
  const auth = useAuth()
  const [userAuth, setUserAuth] = useState<UserAuth>(InitialUserAuth)
  const [authFailed, setAuthFailed] = useState(false)
  const location = useLocation()
  const meetingPathRegex = /^\/meeting(\/.*)?$/

  return (
    <div className="min-h-screen flex flex-col" id="screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          {/*           <Route
            path="/login"
            element={
              !auth.isAuthenticated ? (
                <Login authFailed={authFailed} setAuthFailed={setAuthFailed} />
              ) : (
                <Navigate to="/meeting" />
              )
            }
          /> */}

          <Route path="/FAQ" element={<FAQ />} />

          <>
            <Route
              path="/meeting"
              element={
                <OidcSecure>
                  <Meeting />
                </OidcSecure>
              }
            />
            <Route
              path="/meeting/:id"
              element={
                <OidcSecure>
                  <Meeting />
                </OidcSecure>
              }
            />
            <Route
              path="/outils"
              element={
                <OidcSecure>
                  <Tools />
                </OidcSecure>
              }
            />
          </>

          <Route
            path="/meeting"
            element={
              <OidcSecure>
                <Meeting />
              </OidcSecure>
            }
          />
          <Route
            path="/history"
            element={
              <OidcSecure>
                <History />
              </OidcSecure>
            }
          />
          <Route
            path="/"
            element={
              <OidcSecure>
                <Navigate to="/meeting" />
              </OidcSecure>
            }
          />
          <Route path="/404" element={<Error404 />} />

          <Route
            path="/contact"
            element={
              <OidcSecure>
                <Contact setUserAuth={setUserAuth} />
              </OidcSecure>
            }
          />
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
            element={
              <NewPassword authFailed={authFailed} setAuthFailed={setAuthFailed} />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      {!meetingPathRegex.test(location.pathname) &&
        location.pathname !== '/chat' &&
        location.pathname !== '/' && <Footer />}{' '}
    </div>
  )
}

/* const OidcSecure = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, login } = useOidc()

  useEffect(() => {
    if (!isAuthenticated) {
      login()
    }
  }, [isAuthenticated, login])

  return isAuthenticated ? children : null
}
 */
