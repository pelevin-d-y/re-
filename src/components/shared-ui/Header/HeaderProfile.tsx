import React from 'react'
import { css } from 'astroturf'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeaderProfile: React.FC = () => (
  <div className={s.container}>
    <div className={s.email}>hailey@strata.cc</div>
    <FontAwesomeIcon icon={faUserCircle} size="2x" />
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
  }

  .email {
    font-size: 12px;
    margin-right: 18px;
  }
`

export default HeaderProfile
