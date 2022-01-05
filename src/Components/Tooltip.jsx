import PropTypes from 'prop-types'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

export default function Tooltip(props) {
  return (
    <Tippy content={props.content} theme="light" interactive="true">
      <span>
        <svg viewBox="0 0 34 34" tabIndex="0" className="tooltip-icon">
          <path d="M17 0a17 17 0 1017 17A17 17 0 0017 0zm0 2A15 15 0 112 17 15 15 0 0117 2z"></path>
          <path d="M18.59 25h-3.2v-9.61h3.2zm0-12.79h-3.2V9h3.2z"></path>
        </svg>
      </span>
    </Tippy>
  )
}

Tooltip.propTypes = {
  content: PropTypes.string,
}
