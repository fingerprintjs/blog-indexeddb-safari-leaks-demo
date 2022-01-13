import './index.css'
import './public/cover.png'

import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Terms from './Terms'

const root = document.getElementById('root')

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  </BrowserRouter>,
  root,
)
