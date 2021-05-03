import React, { useState } from 'react'
import Header from 'src/components/shared-ui/Header'
import Sidebar from 'src/components/shared-ui/Sidebar'
import { ClientProvider } from 'src/components/context/ClientContext'
import { css } from 'astroturf'
import classNames from 'classnames'

const HomeLayout: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <ClientProvider>
      <div className={classNames(s.root, menuOpen && s.open)}>
        <Sidebar className={s.sidebar} />
        <div className={s.main}>
          <Header toggleMenu={toggleMenu} />
          <div className={classNames('container', s.content)}>{children}</div>
        </div>
      </div>
    </ClientProvider>
  )
}

const sidebarWidth = 238

const s = css`
  .root {
    min-height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    padding-left: 0;

    transition: all 0.2s ease-in;
  }

  .root.open {
    padding-left: ${sidebarWidth}px;
  }

  .main {
    width: 100%;
  }

  .open .sidebar {
    width: ${sidebarWidth}px;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;

    width: 0;
    height: 100%;
    padding: 28px 0 15px 0;

    border-right: 1px solid #e4e0e0;

    transition: all 0.2s ease-in;
  }

  .content {
    display: flex;
    flex-flow: row nowrap;
    max-width: 1400px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;
  }
`

export default HomeLayout
