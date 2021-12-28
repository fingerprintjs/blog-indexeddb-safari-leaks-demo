import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Databases from './Databases'
import { fetchGoogleIDs } from './Google/Identifiers'

const TERMS_ACCEPTED_KEY = 'accepted-terms'

export default function Leaks({ supportedBrowser }) {
  const [acceptedTerms, setAcceptedTerms] = useState(localStorage.getItem(TERMS_ACCEPTED_KEY))
  const [googleIDs, setGoogleIDs] = useState()
  const [clickEvent, setClickEvent] = useState(false)

  if (!supportedBrowser) {
    return <Unsupported />
  }

  const acceptTerms = async () => {
    localStorage.setItem(TERMS_ACCEPTED_KEY, true)
    setClickEvent(true)
    setAcceptedTerms(true)
    setGoogleIDs(await fetchGoogleIDs())
    setClickEvent(false)
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

  return <Databases googleIDs={googleIDs} clickEvent={clickEvent} />
}

function Unsupported() {
  return <section>Good news, your current browser is not affected!</section>
}

Leaks.propTypes = {
  supportedBrowser: PropTypes.bool,
}
