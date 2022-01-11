import PropTypes from 'prop-types'

// Note that not all of these websites necessarily interact with IndexedDBs on every visit.
// Some websites might skip their IndexedDB logic based on the UA or the visitor's region.

// We check the existens of *every* database inside a nested array (either equals or startswith).
// This allows to identify websites based on multiple database names, if needed.
export const KNOWN_WEBSITES = {
  'docs.google.com': {
    exact: [['GoogleDocs'], ['DocsErrors'], ['GoogleDriveDs']],
    authenticated: true,
    reliable: false,
  },
  'calendar.google.com': {
    exact: [['offline.users']],
    startswith: [['offline.settings.'], ['offline.requests.']],
    authenticated: true,
    reliable: true,
  },
  'mail.google.com': {
    exact: [['user_registry'], ['gmail-sw-keyval']],
    authenticated: true,
    reliable: false,
  },
  'meet.google.com': {
    exact: [['meet_db'], ['storage.bw.offline']],
    authenticated: true,
    reliable: false,
  },
  'drive.google.com': {
    exact: [['GoogleDriveDsImpressions'], ['dfesw-mss-cache-prod'], ['GoogleDriveDs']],
    startswith: [['storage.dfesw-']],
    authenticated: true,
    reliable: false,
  },
  'developers.google.com': {
    exact: [['devsite-index-db']],
    reliable: true,
  },
  'keep.google.com': {
    startswith: [['Keep-']],
    authenticated: true,
    reliable: true,
  },
  'web.whatsapp.com': {
    exact: [['wawc'], ['__dbnames']],
    reliable: true,
  },
  'netflix.com': {
    exact: [['netflix.player']],
    authenticated: true,
    reliable: true,
  },
  'youtube.com': {
    exact: [['yt-serviceworker-metadata']],
    startswith: [
      ['LogsDatabaseV2:'],
      ['PersistentEntityStoreDb:'],
      ['yt-idb-pref-storage:'],
      ['yt-it-response-store:'],
      ['yt-player-local-media:'],
    ],
    reliable: true,
  },
  'facebook.com': {
    exact: [['ServiceWorkerAsyncStorage']],
    authenticated: true,
    reliable: false,
  },
  'instagram.com': {
    exact: [['redux']], // Likely unreliable.
    reliable: true,
  },
  'app.slack.com': {
    exact: [['reduxPersistence']],
    authenticated: true,
    reliable: true,
  },
  'twitter.com': {
    exact: [['sync'], ['localforage'], ['horizonweb']],
    reliable: true,
  },
  'alibaba.com': {
    exact: [['flasher']],
    reliable: true,
  },
  'vk.com': {
    exact: [['sw_keyval_db']],
    reliable: true,
  },
  'dropbox.com': {
    exact: [['apexMetrics'], ['unused']],
    reliable: true,
  },
  'anchor.fm': {
    exact: [['adjust-sdk'], ['anchor-website']],
    reliable: true,
  },
  'huffingtonpost.com': {
    exact: [['a2a5c7f9-3fa0-4182-889a-15aa61acf59b']],
    reliable: true,
  },
  'latimes.com': {
    exact: [['68547f8f-2fd8-4ff3-9b63-51e86e2edee8']],
    reliable: false,
  },
  'theglobeandmail.com': {
    exact: [['6b6b990e-d9d8-4116-a028-76da837d7607']],
    reliable: true,
  },
  'economist.com': {
    exact: [['2a28082a-de31-45fd-a00c-548117e422f7']],
    reliable: false,
  },
  'rollingstone.com': {
    exact: [['3d2fb0bd-52fc-4b75-aaf5-2d436c172540']],
    reliable: true,
  },
  'entrepreneur.com': {
    exact: [['b611f626-25c2-4182-ad7f-50a0ba61117b']],
    reliable: false,
  },
  'foxnews.com': {
    exact: [['X3VhX3Nkazpxd1dXMHA1elRPaTdqUkRLVXZiSVdBOi8=:db']],
    reliable: false,
  },
  'bloomberg.com': {
    exact: [['bloomberg']],
    reliable: true,
  },
  'cnet.com': {
    exact: [['firebaseLocalStorageDb', 'notifications']],
    reliable: true,
  },
  'indiegogo.com': {
    exact: [['theoplayer-cache-database']],
    reliable: true,
  },
  'cbc.ca': {
    exact: [['cbc_storage']],
    reliabe: true,
  },
  'stitcher.com': {
    exact: [['firebase-installations-database']],
    reliable: true,
  },
  'pexels.com': {
    exact: [['AppboyServiceWorkerAsyncStorage']],
    reliable: true,
  },
  'pewresearch.org': {
    exact: [['firebaseLocalStorageDb', 'Braze IndexedDB Support Test']],
    reliable: false,
  },
  'weather.com': {
    exact: [['nerf-web'], ['wxu-web']],
    reliable: true,
  },
  'nymag.com': {
    exact: [['d2fb08da-1c03-4c8a-978f-ad8a96b4c31f']],
    reliable: true,
  },
  'boston.com': {
    exact: [['X3VhX3NkazpYSm9DR1cwR1JEaWV0Z0VoRVhwc0pnOi8=:db']],
    reliable: true,
  },
  'xbox.com': {
    exact: [['XCloudAppLogs']],
    reliable: true,
  },
  'timeout.com': {
    exact: [['67cbf6c5-d926-407b-a684-a0606570ff08']],
    reliable: true,
  },
  'ctvnews.ca': {
    exact: [['289d106c-df24-4cd9-a9fa-753e928c23ad']],
    reliable: true,
  },
  'globalnews.ca': {
    exact: [['f7e98148-cb09-4cf1-9b9f-b5aee3465d6e']],
    reliable: true,
  },
  'standard.co.uk': {
    exact: [['5d79bce7-5d2b-427e-a6c4-b89b6c7bf048']],
    reliable: true,
  },
  'computerworld.com': {
    exact: [['f5b3be27-f789-4ef1-8867-37c67da5b361']],
    reliable: true,
  },
}

export function SupportedWebsites() {
  return (
    <div className="websites">
      {Object.getOwnPropertyNames(KNOWN_WEBSITES)
        .filter((website) => KNOWN_WEBSITES[website].reliable)
        .sort()
        .map((website) => {
          return (
            <SupportedWebsite key={website} website={website} authenticated={KNOWN_WEBSITES[website].authenticated} />
          )
        })}
    </div>
  )
}

function SupportedWebsite(props) {
  return (
    <span>
      <a href={`https://${props.website}`} className="button" target="_blank" rel="noreferrer">
        {props.website}
        {props.authenticated ? '*' : ''}
      </a>
    </span>
  )
}

SupportedWebsite.propTypes = {
  website: PropTypes.string,
  authenticated: PropTypes.bool,
}
