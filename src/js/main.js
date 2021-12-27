import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

import { renderGoogleProfilePhotos, fetchGoogleID } from './google'
import { HTML, TEMPLATE, appendSection, replaceSection } from './templates'
import { KNOWN_WEBSITES, GOOGLE_ID_PATTERNS } from './config'

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
      tooltipId: HTML.TOOLTIP,
      plural: databases.length > 1,
      websites: websites.size !== 0 ? { entries: Array.from(websites) } : undefined,
    }

    const google = {
      ids: ids.size !== 0 ? { entries: Array.from(ids) } : undefined,
      plural: ids.size > 1,
      sectionId: HTML.GOOGLE_RESULT,
      event: !!event,
      onclickFunctionId: HTML.FETCH_GOOGLE_RESULT,
    }

    appendSection(TEMPLATE.SUPPORTED_BROWSER, leaks)
    document.getElementById(HTML.NO_LEAKS_REFRESH)?.addEventListener('click', (e) => {
      e.preventDefault()
      window.location.reload()
    })
    tippy(`#${HTML.TOOLTIP}`, {
      content: databases.join(', '),
      theme: 'light',
    })

    appendSection(TEMPLATE.GOOGLE_IDS, google)
    if (ids.size !== 0) {
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
