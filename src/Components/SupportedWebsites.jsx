import PropTypes from 'prop-types'

// Note that not all of these websites necessarily interact with IndexedDBs on every visit.
// Some websites might skip their IndexedDB logic based on the UA or the visitor's region.

// We check the existens of *every* database inside a nested array (either equals or startswith).
// This allows to identify websites based on multiple database names, if needed.
export const KNOWN_WEBSITES = {
  'docs.google.com': {
    exact: [['GoogleDocs'], ['GoogleDriveDs'], ['DocsErrors']],
  },
  'calendar.google.com': {
    exact: [['offline.users']],
    startswith: [['offline.settings.'], ['offline.requests.']],
  },
  'mail.google.com': {
    exact: [['user_registry'], ['gmail-sw-keyval']],
  },
  'meet.google.com': {
    exact: [['meet_db'], ['storage.bw.offline']],
  },
  'drive.google.com': {
    exact: [['GoogleDriveDsImpressions'], ['dfesw-mss-cache-prod']],
    startswith: [['storage.dfesw-']],
  },
  'developers.google.com': {
    exact: [['devsite-index-db']],
  },
  'keep.google.com': {
    startswith: [['Keep-']],
  },
  'web.whatsapp.com': {
    exact: [['wawc'], ['__dbnames']],
  },
  'netflix.com': {
    exact: [['netflix.player']],
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
  },
  'facebook.com': {
    exact: [['ServiceWorkerAsyncStorage']],
  },
  'instagram.com': {
    exact: [['redux']], // Likely unreliable.
  },
  'app.slack.com': {
    exact: [['reduxPersistence']],
  },
  'twitter.com': {
    exact: [['sync'], ['localforage'], ['horizonweb']],
  },
  'alibaba.com': {
    exact: [['flasher']],
  },
  'vk.com': {
    exact: [['sw_keyval_db']],
  },
  'dropbox.com': {
    exact: [['apexMetrics'], ['unused']],
  },
  'anchor.fm': {
    exact: [['adjust-sdk']],
  },
  'huffingtonpost.com': {
    exact: [['a2a5c7f9-3fa0-4182-889a-15aa61acf59b']],
  },
  //'latimes.com': {
  //  exact: [['68547f8f-2fd8-4ff3-9b63-51e86e2edee8']],
  //},
  'theglobeandmail.com': {
    exact: [['6b6b990e-d9d8-4116-a028-76da837d7607']],
  },
  //'economist.com': {
  //  exact: [['2a28082a-de31-45fd-a00c-548117e422f7']],
  //},
  'rollingstone.com': {
    exact: [['3d2fb0bd-52fc-4b75-aaf5-2d436c172540']],
  },
  //'entrepreneur.com': {
  //  exact: [['b611f626-25c2-4182-ad7f-50a0ba61117b']],
  //},
  //'foxnews.com': {
  //    'exact': [['ACC', 'X3VhX3Nkazpxd1dXMHA1elRPaTdqUkRLVXZiSVdBOi8=:db']] // aswpsdkus.com, not opened in Safari
  //},
  'bloomberg.com': {
    exact: [['bloomberg']],
  },
  'cnet.com': {
    exact: [['firebaseLocalStorageDb', 'notifications']],
  },
  //'edition.cnn.com': {
  //    'exact': [['wknd']] // wknd created by bounceenxchange.com (wunderkind.co)
  //},
  //'gizmodo.com': {
  //    'exact': [['wknd']]
  //},
  //'indiegogo.com': {
  //    'exact': [['theoplayer-cache-database']]
  //},
  'cbc.ca': {
    exact: [['cbc_storage']],
  },
  'stitcher.com': {
    exact: [['firebase-installations-database']],
  },
  'pexels.com': {
    exact: [['AppboyServiceWorkerAsyncStorage']],
  },
  // 'venturebeat.com' : {
  //     'exact': [['firebaseLocalStorageDb']]
  // },
  // 'pewresearch.org': {
  //     'exact': [['firebaseLocalStorageDb']]
  // }
}

export function SupportedWebsites() {
  return (
    <div className="websites">
      {Object.getOwnPropertyNames(KNOWN_WEBSITES).map((website) => {
        return <SupportedWebsite key={website} website={website} />
      })}
    </div>
  )
}

function SupportedWebsite(props) {
  return (
    <span>
      <a href={`https://${props.website}`} className="button" target="_blank" rel="noreferrer">
        {props.website}
      </a>
    </span>
  )
}

SupportedWebsite.propTypes = {
  website: PropTypes.string,
}
