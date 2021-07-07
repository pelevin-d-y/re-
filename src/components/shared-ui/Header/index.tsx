import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Search from 'src/components/shared-ui/Search'
import Img from 'src/components/shared-ui/Img'
import { useClient } from 'src/components/context/ClientContext'
import HeaderProfile from './HeaderProfile'

type Props = {
  toggleMenu: () => void
}

const Header: React.FC<Props> = ({ toggleMenu }) => {
  const { state } = useClient()
  return (
    <header className={classNames(s.header)}>
      <div className={classNames(s.container)}>
        <button type="button" className={s.menu} onClick={toggleMenu}>
          <SvgIcon icon={require('public/svg/menu.svg?include')} />
        </button>
        <div className={s.text}>
          <span className={s.greeting}>Welcome to your Dashboard, &nbsp;</span>
          {state?.name}
        </div>
        <Search
          classes={{ container: s.search }}
          inputPlaceholder="Search..."
        />
        {state?.address && <HeaderProfile className={s.profile} />}
        <div className={s.notification} />
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
    margin-left: 18px;

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
    margin-left: 18px;

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

  .search {
    margin-left: auto;
    margin-right: 12px;
  }

  .notification {
    display: block;
    width: 28px;
    height: 28px;
    margin-left: 17px;

    background: url('/images/notification.png') no-repeat center/contain;
    cursor: pointer;

    &:hover {
      background: url('/images/notification-active.png') no-repeat
        center/contain;
    }
  }
`

export default Header
