import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter basename="/albert">
    <MFSProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </MFSProvider>
  </BrowserRouter>

  //</React.StrictMode>
)
