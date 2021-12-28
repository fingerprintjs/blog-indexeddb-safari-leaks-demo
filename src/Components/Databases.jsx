import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Identifiers from './Google/Identifiers'
import { KNOWN_WEBSITES } from './SupportedWebsites'
import Tooltip from './Tooltip'

async function getLeakedDatabases() {
  return indexedDB.databases().then((dbs) => Array.from(new Set(dbs.map((db) => db.name))))
}

function getKnownWebsites(databases) {
  const websites = new Set()

  if (databases?.length === 0) {
    return []
  }

  for (const [website, value] of Object.entries(KNOWN_WEBSITES)) {
    if (value.exact?.some((dbs) => dbs.every((db) => databases.includes(db)))) {
      websites.add(website)
      continue
    }

    if (value.startswith?.some((dbs) => dbs.every((db) => databases.some((database) => database.startsWith(db))))) {
      websites.add(website)
      continue
    }
  }

  return Array.from(websites)
}

export default function Databases({ googleIDs, isLoading }) {
  const [databases, setDatabases] = useState([])
  const [websites, setWebsites] = useState([])

  useEffect(() => {
    const poll = setInterval(() => checkLeaks(), 1000)

    return () => {
      clearInterval(poll)
    }
  }, [])

  const checkLeaks = async () => {
    const dbs = await getLeakedDatabases()

    setDatabases(dbs)
    setWebsites(getKnownWebsites(dbs))
  }

  return databases?.length === 0 ? (
    <>
      <section>
        Browse to a supported website (see below) and come back to this page to see database name leaks in action.
      </section>
      <Identifiers databases={[]} initialGoogleIDs={googleIDs} isLoading={isLoading} />
    </>
  ) : (
    <>
      <section>
        <div>
          Your browser currently leaks <strong>{databases.length}</strong> database name
          {`${databases.length > 1 ? 's' : ''}`}. <Tooltip content={`List of databases: ${databases.join(', ')}`} />
        </div>
        {websites.length > 0 && (
          <div className="subsection">
            These are some of the websites from your recent browsing activity:
            {websites.map((website) => {
              return <Website key={website} website={website} />
            })}
          </div>
        )}
      </section>
      <Identifiers databases={databases} initialGoogleIDs={googleIDs} isLoading={isLoading} />
    </>
  )
}

Databases.propTypes = {
  googleIDs: PropTypes.array,
  isLoading: PropTypes.bool,
}

function Website(props) {
  return (
    <div>
      <strong>{props.website}</strong>
    </div>
  )
}

Website.propTypes = {
  website: PropTypes.string,
}
