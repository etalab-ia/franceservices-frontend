Object.defineProperty(exports, '__esModule', { value: true })
var react_1 = require('react')
var client_1 = require('react-dom/client')
var spa_1 = require('@codegouvfr/react-dsfr/spa')
var react_router_dom_1 = require('react-router-dom')
var react_router_dom_2 = require('react-router-dom')
var Root_1 = require('./components/Root')
var react_redux_1 = require('react-redux')
var reducer_1 = require('./utils/reducer/reducer')
var isMFSContext_1 = require('./utils/context/isMFSContext')
;(0, spa_1.startReactDsfr)({
  defaultColorScheme: 'system',
  Link: react_router_dom_2.Link,
})
client_1.default.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <react_router_dom_1.BrowserRouter basename="/">
    <isMFSContext_1.MFSProvider>
      <react_redux_1.Provider store={reducer_1.store}>
        <Root_1.Root />
      </react_redux_1.Provider>
    </isMFSContext_1.MFSProvider>
  </react_router_dom_1.BrowserRouter>
  //</React.StrictMode>
)
