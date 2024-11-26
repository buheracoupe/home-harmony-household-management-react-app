import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {store, persistor} from './Redux/Store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <App />
      </PersistGate>
      </Provider>
  </StrictMode>,
)
