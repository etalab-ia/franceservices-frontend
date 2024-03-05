/*****************************************************************************************************
 *                                                                                                   *
 *  Hello Albert                                                                                     *
 *  React.StrictMode DISABLED because the extra re-render from strict mode breaks streming behavior, *
 *  move it down the tree if you need it                                                             *
 *                                                                                                   *
 *****************************************************************************************************/

import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Root } from './components/Root'
import { MFSProvider } from './utils/context/isMFSContext'
import { store } from './utils/reducer/reducer'

// @ts-expect-error TS(2322) FIXME: Type 'ForwardRefExoticComponent<LinkProps & RefAtt... Remove this comment to see the full error message
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
