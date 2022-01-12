import { SupportedWebsites } from './SupportedWebsites'

export default function FAQ() {
  return (
    <section className="faq">
      <h1>What is this vulnerability and who is affected?</h1>
      <p>
        This demo showcases information leaks resulting from an{' '}
        <a href="https://fingerprintjs.com/blog" target="_blank" rel="noreferrer">
          IndexedDB same-origin policy violation
        </a>{' '}
        in{' '}
        <a href="https://webkit.org/" target="_blank" rel="noreferrer">
          WebKit
        </a>{' '}
        (a browser engine primarily used in Safari, as well as all iOS and iPadOS web browsers). You can test this demo
        on all affected browsers: Safari 15 on macOS, or any browser on iOS and iPadOS 15.
      </p>
      <p>
        The demo illustrates how any website can learn a visitor&apos;s recent and current browsing activity (websites
        visited in different tabs or windows) using this leak. For authenticated visitors, the demo can also leak Google
        User IDs and profile pictures.
      </p>
      <p>The demo detects the following websites:</p>
      <SupportedWebsites />
      <small>* Requires an authenticated session</small>
      <p>
        This is not an exhaustive list of affected websites. All websites that interact with the IndexedDB API can
        potentially be detected.
      </p>
    </section>
  )
}
