import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import { Root } from './components/Root/Root'
import { store } from './utils/reducer/reducer'
import { AuthProvider, useAuth } from '@utils/context/authContext'
import { OidcProvider } from '@axa-fr/react-oidc'
declare global {
  interface Window {
    _mtm: any[]
    _paq: any[]
  }
}

const configuration = {
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,

  redirect_uri: `${window.location.origin}/authentication/callback`,
  silent_redirect_uri: `${window.location.origin}/authentication/silent-callback`,
  scope: 'offline_access', // offline_access scope allow your client to retrieve the refresh_token
  authority: `${import.meta.env.VITE_KEYCLOAK_AUTHORITY}`,
  service_worker_relative_url: '/OidcServiceWorker.js', // just comment that line to disable service worker mode
  service_worker_only: false,
  demonstrating_proof_of_possession: false,
}

function App() {
  useEffect(() => {
    const matomoUrl: string = import.meta.env.VITE_MATOMO_URL
    window._mtm = window._mtm || []
    const _mtm = window._mtm
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })
    const d = document
    const g = d.createElement('script')
    const s = d.getElementsByTagName('script')[0]
    g.async = true
    g.src = matomoUrl
    s.parentNode.insertBefore(g, s)
    window._paq = window._paq || []
    const _paq = window._paq
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['setExcludedQueryParams', ['simulationId', '_csrf']])
    _paq.push(['trackPageView'])
    _paq.push(['enableLinkTracking'])
    ;(() => {
      const u = 'https://stats.data.gouv.fr/'
      _paq.push(['setTrackerUrl', `${u}matomo.php`])
      _paq.push(['setSiteId', '300'])
      const d = document
      const g = d.createElement('script')
      const s = d.getElementsByTagName('script')[0]
      g.async = true
      g.src = `${u}matomo.js`
      s.parentNode.insertBefore(g, s)
    })()
  }, [])
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <OidcProvider configuration={configuration}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Root />
            </QueryClientProvider>
          </AuthProvider>
        </OidcProvider>
      </Provider>
    </BrowserRouter>
  )
}

startReactDsfr({ defaultColorScheme: 'system', Link })

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('error', error)
    },
  }),
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
