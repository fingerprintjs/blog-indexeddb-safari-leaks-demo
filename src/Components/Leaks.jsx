import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Databases from './Databases'
import { fetchGoogleIDs } from './Google/Identifiers'
import Instructions from './Instructions'

const TERMS_ACCEPTED_KEY = 'accepted-terms'

export default function Leaks({ isAffectedBrowser }) {
  const [acceptedTerms, setAcceptedTerms] = useState(localStorage.getItem(TERMS_ACCEPTED_KEY))
  const [googleIDs, setGoogleIDs] = useState(null)
  const [isPopupActive, setPopupActive] = useState(false)

  if (!isAffectedBrowser) {
    return <NotAffected />
  }

  const acceptTerms = async () => {
    localStorage.setItem(TERMS_ACCEPTED_KEY, true)
    setAcceptedTerms(true)
    setPopupActive(true)
    setGoogleIDs(await fetchGoogleIDs())
    setPopupActive(false)
  }

  if (!acceptedTerms) {
    return (
      <section>
        <div className="terms button" onClick={acceptTerms}>
          Start demo
        </div>
        <div>
          <small>
            By clicking the button I agree to the <Link to="/terms">terms of service</Link>.
          </small>
        </div>
      </section>
    )
  }

  return (
    <>
      <Instructions />
      <Databases googleIDs={googleIDs} isLoading={isPopupActive} />
    </>
  )
}

function NotAffected() {
  return (
    <div className="banner">
      Your browser is not affected. Please open this demo in Safari 15 on macOS, or any browser on iOS and iPadOS 15.
    </div>
  )
}

Leaks.propTypes = {
  isAffectedBrowser: PropTypes.bool,
}
