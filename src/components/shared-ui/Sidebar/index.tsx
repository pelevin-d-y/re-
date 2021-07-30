import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Logo from 'src/components/shared-ui/Logo'
import Button from 'src/components/shared-ui/Button'
import SidebarList from './SidebarList'
import Close from '../Close'

type Props = {
  className?: string
  toggleMenu: () => void
  isOpen: boolean
}

const Sidebar: React.FC<Props> = ({ className, toggleMenu, isOpen }) => (
  <div className={classNames(s.container, className, isOpen && s.default)}>
    <Close className={s.close} handler={toggleMenu} />
    <div className={s.content}>
      <div className={s.logo}>
        <Logo isOpen={isOpen} />
      </div>
      <SidebarList isOpen={isOpen} />
      <Button className={s.link} variant="outlined">
        Log Out
      </Button>
    </div>
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    background: #fafafa;
  }

  .logo {
    width: 141px;
    margin-bottom: 38px;
    padding-left: 34px;
  }

  .default {
    .link {
      opacity: 1;
    }
  }

  .close {
    position: absolute;
    z-index: 20;
    top: 20px;
    right: 20px;
    display: none;

    @include small-desktop {
      display: block;
    }
  }

  .link {
    opacity: 0;
    min-width: 73px;
    margin-left: 34px;
    margin-top: 50px;

    @include small-desktop {
      opacity: 1;
    }
  }
`

export default Sidebar
