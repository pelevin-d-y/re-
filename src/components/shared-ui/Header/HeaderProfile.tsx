import React from 'react'
import { css } from 'astroturf'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeaderProfile: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.email}>hailey@strata.cc</div>
    <FontAwesomeIcon icon={faUserCircle} size="2x" />
  </div>
)

const styles = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
  }

  .email {
    margin-right: 10px;
  }
`

export default HeaderProfile
