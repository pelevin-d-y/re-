import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Search from 'src/components/shared-ui/Search'

import HeaderToDos from './HeaderToDos'
import HeaderProfile from './HeaderProfile'
import HeaderTheme from './HeaderTheme'

interface Props {
  toggleMenu: () => void
}

const Header: React.FC<Props> = ({ toggleMenu }) => (
  <header className={classNames(s.header)}>
    <div className={classNames('container', s.container)}>
      <button type="button" className={s.menu} onClick={toggleMenu}>
        <SvgIcon icon={require('public/svg/menu.svg?include')} />
      </button>
      <div className={s.text}>
        <span className={s.greeting}>Welcome to your Dashboard, &nbsp;</span>
        Hailey
      </div>
      <Search className={s.search} inputPlaceholder="Search..." />
      <HeaderTheme />
      <HeaderToDos />
      <HeaderProfile />
    </div>
  </header>
)

const s = css`
  .header {
    width: 100%;
    padding-top: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--grey);
  }

  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  .search {
    max-width: 202px;
    width: 100%;
  }

  .text {
    font-weight: var(--semibold);
  }

  .menu {
    border: none;
    background: none;
    cursor: pointer;
  }

  .greeting {
    color: #c1c1c1;
  }
`

export default Header
