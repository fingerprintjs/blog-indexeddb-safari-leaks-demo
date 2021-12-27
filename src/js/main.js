import { fetchGoogleID, renderGoogleProfilePhotos  } from './google'
import { appendSection, createTooltip, GOOGLE_TOOLTIP_TEXT, HTML, replaceSection, TEMPLATE } from './templates'
import { GOOGLE_ID_PATTERNS, KNOWN_WEBSITES } from './config'

const TERMS_ACCEPTED_KEY = 'accepted-terms'

async function getLeakedDatabases() {
  return indexedDB.databases().then((dbs) => Array.from(new Set(dbs.map((db) => db.name))))
}

export function initialize() {
  const ios = navigator.userAgent.includes('iPhone OS 15')
  const ipad = navigator.userAgent.includes('iPad; CPU OS 15')
  const macos = navigator.userAgent.includes('Macintosh') && navigator.userAgent.includes('Version/15')
  const supported = ios || ipad || macos

  replaceSection(
    TEMPLATE.SUPPORTED_WEBSITES,
    { websites: Object.getOwnPropertyNames(KNOWN_WEBSITES) },
    HTML.SUPPORTED_WEBSITES,
  )

  if (!supported) {
    appendSection(TEMPLATE.UNSUPPORTED_BROWSER)

    return
  }

  if (!localStorage.getItem(TERMS_ACCEPTED_KEY)) {
    appendSection(TEMPLATE.SHOW_TERMS, { sectionId: HTML.TERMS, actionId: HTML.ACCEPT_TERMS })
    document.getElementById(HTML.ACCEPT_TERMS).addEventListener('click', (e) => {
      localStorage.setItem(TERMS_ACCEPTED_KEY, true)
      document.getElementById(HTML.TERMS).remove()
      startDemo(e)
    })

    return
  }

  startDemo()
}

function startDemo(event) {
  getLeakedDatabases().then((databases) => {
    const ids = new Set()
    const websites = new Set()

    if (databases && databases.length > 0) {
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

      databases.forEach((db) => {
        GOOGLE_ID_PATTERNS.forEach((p) => {
          const match = db.match(p)
          if (match) ids.add(match[1])
        })
      })
    }

    const leaks = {
      databases: databases.length > 0 ? { entries: databases } : undefined,
      onclickFunctionId: HTML.NO_LEAKS_REFRESH,
      tooltipId: HTML.DATABASES_TOOLTIP,
      plural: databases.length > 1,
      websites: websites.size !== 0 ? { entries: Array.from(websites) } : undefined,
    }

    const google = {
      ids: ids.size !== 0 ? { entries: Array.from(ids) } : undefined,
      plural: ids.size > 1,
      sectionId: HTML.GOOGLE_RESULT,
      tooltipId: HTML.GOOGLE_TOOLTIP,
      event: !!event,
      onclickFunctionId: HTML.FETCH_GOOGLE_RESULT,
    }

    appendSection(TEMPLATE.SUPPORTED_BROWSER, leaks)
    createTooltip(HTML.DATABASES_TOOLTIP, `List of databases: ${databases.join(', ')}`)
    document.getElementById(HTML.NO_LEAKS_REFRESH)?.addEventListener('click', (e) => {
      e.preventDefault()
      window.location.reload()
    })

    appendSection(TEMPLATE.GOOGLE_IDS, google)
    createTooltip(HTML.GOOGLE_TOOLTIP, GOOGLE_TOOLTIP_TEXT)
    if (ids.size !== 0 && !event) {
      // Do this separately as it involves fetching network resources.
      renderGoogleProfilePhotos(Array.from(ids))
    } else {
      const result = document.getElementById(HTML.FETCH_GOOGLE_RESULT)
      if (result) {
        document.getElementById(HTML.FETCH_GOOGLE_RESULT).addEventListener('click', fetchGoogleID)
      }
    }
  })

  if (event) {
    fetchGoogleID(event)
  }
}

document.addEventListener('DOMContentLoaded', initialize(), false)
