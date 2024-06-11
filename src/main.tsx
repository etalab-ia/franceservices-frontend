/*****************************************************************************************************
 *                                                                                                   *
 *  Hello Albert                                                                                     *
 *  React.StrictMode DISABLED because the extra re-render from strict mode breaks streming behavior, *
 *  move it down the tree if you need it                                                             *
 *                                                                                                   *
 *****************************************************************************************************/

import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import { Root } from './components/Root'
import { MFSProvider } from './utils/context/isMFSContext'
import { store } from './utils/reducer/reducer'

startReactDsfr({ defaultColorScheme: 'system', Link })
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <MFSProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Root />
        </QueryClientProvider>
      </Provider>
    </MFSProvider>
  </BrowserRouter>
)
