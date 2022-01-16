import './index.css'

import FAQ from './Components/FAQ'
import Leaks from './Components/Leaks'
import Logo from './Components/Logo'

import Footer from './Components/Footer'

function isAffectedBrowser() {
  const ios = navigator.userAgent.includes('iPhone OS 15')
  const ipad = navigator.userAgent.includes('iPad; CPU OS 15')
  const macos = navigator.userAgent.includes('Macintosh') && navigator.userAgent.includes('Version/15')
  const features = detectBasedOnFeatures()

  return ios || ipad || macos || features
}

function detectBasedOnFeatures() {
  const w = window
  const n = navigator

  const countTruthy = (values) => {
    return values.reduce((sum, value) => sum + (value ? 1 : 0), 0)
  }

  const isWebkit = () => {
    return (
      countTruthy([
        'ApplePayError' in w,
        'CSSPrimitiveValue' in w,
        'Counter' in w,
        n.vendor.indexOf('Apple') === 0,
        'getStorageUpdates' in n,
        'WebKitMediaKeys' in w,
      ]) >= 4
    )
  }

  const isWebkit612OrNewer = () => {
    return (
      countTruthy([
        'mediaSession' in n,
        'BigInt64Array' in w,
        'FormDataEvent' in w,
        'ImageBitmap' in w,
        'WebGL2RenderingContext' in w,
        'onclose' in w,
      ]) >= 4
    )
  }

  return isWebkit() && isWebkit612OrNewer()
}

export default function App() {
  return (
    <>
      <Logo />
      <h1>Safari 15 IndexedDB Leaks</h1>
      <Leaks isAffectedBrowser={isAffectedBrowser()} />
      <FAQ />
      <Footer />
    </>
  )
}
