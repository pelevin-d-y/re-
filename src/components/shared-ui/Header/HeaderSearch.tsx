import React from 'react'
import { css } from 'astroturf'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeaderSearch: React.FC = () => (
  <div className={styles.search}>
    <FontAwesomeIcon className={styles.icon} icon={faSearch} />
    <input className={styles.input} type="text" />
  </div>
)

const styles = css`
  .search {
    position: relative;
    width: 250px;
  }

  .icon {
    position: absolute;
    left: 8px;
    top: 13px;
  }

  .input {
    padding: 12px;
    padding-left: 28px;
    border: 1px solid grey;
  }
`

export default HeaderSearch
