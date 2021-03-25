import React from 'react'
import { css } from 'astroturf'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeaderSearch: React.FC = () => (
  <div className={s.search}>
    <FontAwesomeIcon
      className={s.icon}
      icon={faSearch}
      style={{ width: '18px', height: '18px' }}
    />
    <input className={s.input} type="text" placeholder="Search..." />
  </div>
)

const s = css`
  .search {
    position: relative;
    width: 202px;
  }

  .icon {
    position: absolute;
    left: 16px;
    top: 12px;
  }

  .input {
    padding: 11px 22px 12px 49px;
    border: 1px solid #d9d9d9;
    border-radius: 20px;
  }
`

export default HeaderSearch
