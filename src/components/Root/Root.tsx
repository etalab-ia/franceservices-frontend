import { useAuth, withAuthenticationRequired } from 'react-oidc-context'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from '../../pages/404'
import { Contact } from '../../pages/Contact'
import { FAQ } from '../../pages/FAQ'
import { History } from '../../pages/History'
import { Meeting } from '../../pages/Meeting'
import { Tools } from '../../pages/Tools'
import Footer from './Footer'
import Header from './Header'
import { LoadingSpinner } from 'components/LoadingSpinner'

export const Root = () => {
  const auth = useAuth()
  const location = useLocation()
  const meetingPathRegex = /^\/meeting(\/.*)?$/

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
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      {!meetingPathRegex.test(location.pathname) && location.pathname !== '/' && (
        <Footer />
      )}
    </div>
  )
}

const PrivateRoute = ({ component: Component, ...props }) => {
  const ComponentWithAuth = withAuthenticationRequired(Component, {
    OnRedirecting: () => <LoadingSpinner />,
  })

  return <ComponentWithAuth {...props} />
}
