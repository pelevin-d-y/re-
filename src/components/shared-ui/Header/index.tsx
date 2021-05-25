import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Search from 'src/components/shared-ui/Search'
import { useClient } from 'src/components/context/ClientContext'

import HeaderToDos from './HeaderToDos'
import HeaderProfile from './HeaderProfile'
import HeaderTheme from './HeaderTheme'

type Props = {
  toggleMenu: () => void
}

const Header: React.FC<Props> = ({ toggleMenu }) => {
  const {
    state: { data },
  } = useClient()
  return (
    <header className={classNames(s.header)}>
      <div className={classNames(s.container)}>
        <button type="button" className={s.menu} onClick={toggleMenu}>
          <SvgIcon icon={require('public/svg/menu.svg?include')} />
        </button>
        <div className={s.text}>
          <span className={s.greeting}>Welcome to your Dashboard, &nbsp;</span>
          {data.name}
        </div>
        <Search
          classes={{ container: s.search }}
          inputPlaceholder="Search..."
        />
        <HeaderTheme className={s.theme} />
        <HeaderToDos className={s.toDos} />
        {data.address && <HeaderProfile />}
      </div>
    </header>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .header {
    width: 100%;
    padding-top: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--grey);
    background: var(--white);
  }

  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    margin-left: auto;
    margin-right: auto;

    @include small-desktop {
      flex-flow: row wrap;
    }
  }

  .search {
    max-width: 202px;
    width: 100%;
    @include tablet {
      display: none;
    }
  }

  .theme {
    @include tablet {
      display: none;
    }
  }

  .toDos {
    @include tablet {
      display: none;
    }
  }

  .text {
    font-weight: var(--semibold);
    @include tablet {
      display: none;
    }
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
