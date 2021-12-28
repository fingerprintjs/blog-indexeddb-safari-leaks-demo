import { SupportedWebsites } from './SupportedWebsites'

export default function FAQ() {
  return (
    <section className="faq">
      <h1>What is this all about?</h1>
      <p>
        This demo showcases information leaks resulting from an{' '}
        <a href="https://fingerprintjs.com/blog" target="_blank" rel="noreferrer">
          IndexedDB same-origin policy violation
        </a>{' '}
        in{' '}
        <a href="https://webkit.org/" target="_blank" rel="noreferrer">
          WebKit
        </a>{' '}
        (a browser engine primarily used in Safari, as well as all iOS and iPadOS web browsers).
      </p>
      <p>
        It shows that arbitrary websites can learn a visitor&apos;s recent and current browsing activity (websites
        visited in different tabs or windows). For authenticated visitors the demo can leak Google User IDs and profile
        pictures. The demo detects the following websites:
      </p>
      <SupportedWebsites />
      <p>
        The supported browsers are Safari 15 on macOS, and all browsers on iOS and iPadOS 15. Other browsers and
        platforms are not affected.
      </p>
    </section>
  )
}
