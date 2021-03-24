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
    <div className={styles.content}>
      <Logo className={styles.logo} />
      <SidebarList />
      <Link href="/">Sign Up</Link>
    </div>
  </div>
)

Sidebar.defaultProps = {
  className: undefined,
}

const styles = css`
  .logo {
    margin-bottom: 20px;
  }
`

export default Sidebar
