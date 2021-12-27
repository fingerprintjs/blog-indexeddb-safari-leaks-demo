import { appendSection, createTooltip, GOOGLE_TOOLTIP_TEXT, HTML, replaceSection, TEMPLATE } from './templates'

export async function renderGoogleProfilePhotos(ids) {
  let photos = []
  Promise.all(
    ids.map(async (id) => {
      // eslint-disable-next-line no-undef
      const url = `https://people.googleapis.com/v1/people/${id}?personFields=photos&key=${process.env.PEOPLE_API_KEY}`

      const response = await fetch(url)
      const r = await response.json()
      if (r.photos) {
        r.photos.forEach((photo) => {
          if (!photo.default) {
            photos.push(photo.url)
          }
        })
      }
    }),
  ).then(() => {
    // The protocol is part of the template so Parcel ignores it during dependency resolution.
    photos = photos.filter((p) => p).map((url) => url.replace('https://', ''))
    if (photos.length !== 0) {
      appendSection(TEMPLATE.GOOGLE_PHOTOS, { photos: photos })
    }
  })
}

export function fetchGoogleID(e) {
  e && e.preventDefault && e.preventDefault()

  const result = document.getElementById(HTML.GOOGLE_RESULT)
  if (result) {
    document.getElementById(HTML.GOOGLE_RESULT).innerText = `This might take up to 5 seconds...`
  }

  const query = setInterval(async function () {
    const databases = await indexedDB.databases()
    const ids = new Set()

    databases.forEach((db) => {
      if (db.name.startsWith('Keep-')) {
        let id = db.name.split('-')[1]
        if (id.match(/\d+/)) ids.add(id)
      }
    })

    if (ids.size !== 0) {
      clearTimeout(checkPopup)
      cleanup(Array.from(ids))
      // Do this separately as it involves fetching network resources.
      renderGoogleProfilePhotos(Array.from(ids))
    }
  }, 80)

  const popup = window.open('https://keep.google.com/u/0/', '', 'width=50,height=50,left=9999,top=9999')
  const checkPopup = setTimeout(() => {
    cleanup()
  }, 3000) // Wait 3 seconds to make sure the page is fully loaded on slower connections.

  function cleanup(ids) {
    if (ids && ids.length > 0) {
      replaceSection(
        TEMPLATE.GOOGLE_IDS,
        {
          ids: { entries: ids },
          plural: ids.length > 1,
          sectionId: HTML.GOOGLE_RESULT,
          tooltipId: HTML.GOOGLE_TOOLTIP,
        },
        HTML.GOOGLE_RESULT,
      )
      createTooltip(HTML.GOOGLE_TOOLTIP, GOOGLE_TOOLTIP_TEXT)
    } else {
      replaceSection(TEMPLATE.GOOGLE_IDS, { unauthenticated: true }, HTML.GOOGLE_RESULT)
    }
    clearInterval(query)
    popup.close()
  }
}
