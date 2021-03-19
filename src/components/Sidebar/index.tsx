import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Logo from 'src/components/Logo'
import Link from 'src/components/Link'
import SidebarList from './SidebarList'

interface Props {
  className?: string
}

const Sidebar = ({ className }: Props): JSX.Element => (
  <div className={classNames(className)}>
    <div className={styles.content}>
      <Logo className={styles.logo} />
      <SidebarList />
      <Link href="/">Sign Up</Link>
    </div>
  </div>
)

Sidebar.defaultProps = {
  className: null,
}

const styles = css`
  .logo {
    margin-bottom: 20px;
  }
`

export default Sidebar
