// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
// import { store } from './app/store'
// import { Auth0Provider } from "@auth0/auth0-react";
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'

// let persistor = persistStore(store);
// createRoot(document.getElementById('root')).render(


//   <Auth0Provider
//     domain={import.meta.env.VITE_DOMAIN}
//     clientId={import.meta.env.VITE_CLIENT_ID}
//     authorizationParams={{
//       redirect_uri: window.location.origin
//     }}
//   >
//     <Provider store={store}>
//       <PersistGate persistor={persistor} >
//         <App />
//       </PersistGate>
//     </Provider>
//   </Auth0Provider>,
// )


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './features/app/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>

)