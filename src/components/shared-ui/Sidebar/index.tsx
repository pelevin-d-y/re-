import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Logo from 'src/components/shared-ui/Logo'
import Link from 'src/components/shared-ui/Link'
import SidebarList from './SidebarList'

interface Props {
  className?: string
}

const Sidebar: React.FC<Props> = ({ className }: Props) => (
  <div className={classNames(className)}>
    <div className={s.content}>
      <Logo className={s.logo} />
      <SidebarList />
      <Link className={s.link} variant="outlined" href="/">
        Log Out
      </Link>
    </div>
  </div>
)

Sidebar.defaultProps = {
  className: undefined,
}

const s = css`
  .logo {
    margin-bottom: 20px;
    padding-left: 34px;
  }
  .link {
    margin-left: 34px;
    margin-top: 50px;
  }
`

export default Sidebar
