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
}

const Sidebar: React.FC<Props> = ({ className, toggleMenu }) => (
  <div className={classNames(s.container, className)}>
    <Close className={s.close} handler={toggleMenu} />
    <div className={s.content}>
      <div className={s.logo}>
        <Logo />
      </div>
      <SidebarList />
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
    width: calc(107px + 34px);
    margin-bottom: 20px;
    padding-left: 34px;
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
    margin-left: 34px;
    margin-top: 50px;
  }
`

export default Sidebar
