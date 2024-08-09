import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import { Root } from './components/Root/Root'
import { store } from './utils/reducer/reducer'

function App() {
  useEffect(() => {
    var _mtm = (window._mtm = window._mtm || [])
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.async = true
    g.src = 'https://stats.data.gouv.fr/js/container_DXD5Rm0J.js'
    s.parentNode.insertBefore(g, s)
  }, [])

  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Root />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  )
}

startReactDsfr({ defaultColorScheme: 'system', Link })
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
