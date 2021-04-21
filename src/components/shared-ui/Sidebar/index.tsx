import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Logo from 'src/components/shared-ui/Logo'
import Button from 'src/components/shared-ui/Button'
import SidebarList from './SidebarList'

type Props = {
  className?: string
}

const Sidebar: React.FC<Props> = ({ className }: Props) => (
  <div className={classNames(className)}>
    <div className={s.content}>
      <Logo className={s.logo} />
      <SidebarList />
      <Button className={s.link} variant="outlined">
        Log Out
      </Button>
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
