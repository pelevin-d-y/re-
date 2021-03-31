import React from 'react'
import { css } from 'astroturf'
import Search from 'public/svg/search.svg'

const HeaderSearch: React.FC = () => (
  <div className={s.search}>
    <Search className={s.icon} />
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
    top: 11px;
    width: 18px;
    height: 18px;
  }

  .input {
    padding: 11px 22px 12px 49px;
    border: 1px solid #d9d9d9;
    border-radius: 20px;
  }
`

export default HeaderSearch
