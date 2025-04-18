import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css'
import { RoutesApp } from './app/routes'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { initTheme } from './hooks/useTelegram'

// Инициализируем тему
initTheme();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RoutesApp />
    </Provider>
)
