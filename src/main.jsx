import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './store'
import ThemeSync from './Components/ThemeSync.jsx'

document.documentElement.dataset.theme = store.getState().theme.mode
document.documentElement.style.colorScheme = store.getState().theme.mode

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeSync />
      <App />
    </Provider>
  </StrictMode>,
)
