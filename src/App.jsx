import './index.css'

import FAQ from './Components/FAQ'
import Leaks from './Components/Leaks'
import Logo from './Components/Logo'

import Footer from './Components/Footer'

function isSupportedBrowser() {
  const ios = navigator.userAgent.includes('iPhone OS 15')
  const ipad = navigator.userAgent.includes('iPad; CPU OS 15')
  const macos = navigator.userAgent.includes('Macintosh') && navigator.userAgent.includes('Version/15')

  return ios || ipad || macos
}

export default function App() {
  return (
    <>
      <Logo />
      <h1>Safari 15 IndexedDB Leaks</h1>
      <Leaks isSupportedBrowser={isSupportedBrowser()} />
      <FAQ />
      <Footer />
    </>
  )
}
