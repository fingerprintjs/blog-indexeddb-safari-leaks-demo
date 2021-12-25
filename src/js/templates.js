import { render } from 'Mustache'

export const TEMPLATE = {
  SHOW_TERMS: 'show-terms',
  SUPPORTED_WEBSITES: 'supported-website-links',
  UNSUPPORTED_BROWSER: 'unsupported-browser',
  SUPPORTED_BROWSER: 'supported-browser',
  GOOGLE_IDS: 'google-ids',
  GOOGLE_PHOTOS: 'google-photos',
}

export const HTML = {
  TERMS: 'terms',
  ACCEPT_TERMS: 'accept-terms',
  CONTENT_SECTIONS: 'content-sections',
  SUPPORTED_WEBSITES: 'supported-websites',
  GOOGLE_RESULT: 'google-result',
  FETCH_GOOGLE_RESULT: 'fetch-google-id',
  NO_LEAKS_REFRESH: 'no-leaks-refresh',
}

export function appendSection(identifier, view) {
  const section = document.getElementById(identifier).cloneNode(true)
  const parent = document.getElementById(HTML.CONTENT_SECTIONS)
  if (view) {
    parent.insertAdjacentHTML('beforeend', render(section.innerHTML, view))
  } else {
    parent.appendChild(section.content)
  }
}

export function replaceSection(identifier, view, existing) {
  const section = document.getElementById(identifier).cloneNode(true)
  document.getElementById(existing).outerHTML = render(section.innerHTML, view)
}
