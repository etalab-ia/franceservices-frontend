import { useAuth } from '@utils/context/authContext'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from '../../pages/404'
import { Contact } from '../../pages/Contact'
import { FAQ } from '../../pages/FAQ'
import { History } from '../../pages/History'
import { Meeting } from '../../pages/Meeting'
import { Tools } from '../../pages/Tools'
import Footer from './Footer'
import Header from './Header'

export const Root = () => {
  const location = useLocation()
  const meetingPathRegex = /^\/meeting(\/.*)?$/
  console.log('Benjamin')
  return (
    <div className="min-h-screen flex flex-col" id="screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/home" element={<Navigate to="/meeting" />} />
          <Route path="/" element={<Navigate to="/meeting" />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/meeting/:id" element={<Meeting />} />
          <Route path="/outils" element={<Tools />} />
          <Route path="/history" element={<History />} />
          <Route path="/contact" element={<Contact />} />
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
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    window.location.href = import.meta.env.VITE_PRO_CONNECT_LOGIN_URL
    return null
  }

  return <Component {...props} />
}
