import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context'
import { Provider } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import { Root } from './components/Root'
import { MFSProvider } from './utils/context/isMFSContext'
import { store } from './utils/reducer/reducer'

import { onSigninCallback, userManager } from '@utils/keycloak'
import ProtectedApp from 'components/Auth/keycloak/ProtectedApp'

function App() {
  useEffect(() => {
    var _mtm = (window._mtm = window._mtm || [])
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })
    const d = document
    const g = d.createElement('script')
    const s = d.getElementsByTagName('script')[0]
    g.async = true
    g.src = import.meta.env.VITE_MATOMO_URL
    s.parentNode.insertBefore(g, s)
  }, [])

  return (
    <BrowserRouter basename="/">
      <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
        <MFSProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <ProtectedApp>
                <Root />
              </ProtectedApp>
            </QueryClientProvider>
          </Provider>
        </MFSProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

startReactDsfr({ defaultColorScheme: 'system', Link })
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
