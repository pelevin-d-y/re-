import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import HeaderSearch from './HeaderSearch'
import HeaderToDos from './HeaderToDos'
import HeaderProfile from './HeaderProfile'

const Header: React.FC = () => {
  const menuHandler = () => {
    console.log('menuHandler')
  }

  return (
    <header className={classNames(styles.header)}>
      <div className={classNames('container', styles.container)}>
        <FontAwesomeIcon
          className={styles.menu}
          onClick={menuHandler}
          icon={faAlignLeft}
          size="2x"
        />
        <div> Welcome to your Dashboard, Hailey </div>
        <HeaderSearch />
        <HeaderToDos />
        <HeaderProfile />
      </div>
    </header>
  )
}

const styles = css`
  .header {
    width: 100%;
    padding-top: 35px;
    padding-bottom: 10px;
    border-bottom: 1px solid grey;
  }

  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  .menu {
    cursor: pointer;
  }
`

export default Header
