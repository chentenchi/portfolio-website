
import { StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Experience from './Experience.jsx'
import ClashRoyale from './ClashRoyale.jsx'
import GroceryTracker from './GroceryTracker.jsx'
import TaxAssistant from './TaxAssistant.jsx'

// Scroll to the correct section when navigating between pages.

function ScrollToSection() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))
    const section = document.getElementById(id)

    section?.scrollIntoView({
      behavior: 'instant',
      block: 'start'
    })
  }, [pathname, hash])

  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
<BrowserRouter>  
<Routes>
  <Route
    path="/"
    element={
      <>
        <App />
        <ScrollToSection />
      </>
    }
  />

  <Route
    path="/experience"
    element={<Experience />}
  />

  <Route
    path="/clash-royale"
    element={<ClashRoyale />}
  />

<Route
  path="/grocery-price-tracker"
  element={<GroceryTracker />}
/>

<Route
  path="/tax-assistant"
  element={<TaxAssistant />}
/>

</Routes>
</BrowserRouter>
  </StrictMode>,
)