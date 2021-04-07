import React from 'react'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

const HeaderSearch: React.FC = () => (
  <div className={s.search}>
    <SvgIcon
      className={s.icon}
      icon={require('public/svg/search.svg?include')}
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
