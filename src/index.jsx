import './index.css'

import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Terms from './Terms'

const root = document.getElementById('root')
const base = location.pathname

render(
  <BrowserRouter basename={base}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  </BrowserRouter>,
  root,
)
