import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import { Root } from './components/Root/Root'
import { store } from './utils/reducer/reducer'
import { WebStorageStateStore } from 'oidc-client-ts'
import { AuthProvider } from 'react-oidc-context'
declare global {
  interface Window {
    _mtm: any[]
    _paq: any[]
  }
}

const oidcConfig = {
  authority: import.meta.env.VITE_KEYCLOAK_AUTHORITY,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  redirect_uri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URL,
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
        <AuthProvider {...oidcConfig}>
          <QueryClientProvider client={queryClient}>
            <Root />
          </QueryClientProvider>
        </AuthProvider>
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
