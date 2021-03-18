import React from 'react'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Sidebar from 'src/components/Sidebar'
import { css } from 'astroturf'

const HomeLayout: React.FC = ({ children }) => (
  <div className={styles.root}>
    <Sidebar className={styles.sidebar}/>
    <div className={styles.main}>
      <Header />
        <div className={styles.content}>
          {children}
        </div>
      <Footer />
    </div>
  </div>
)

const styles = css`
  .root {
    min-height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    padding-left: 301px;
  }

  .main {
    width: 100%;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;

    width: 300px;
    height: 100%;
    padding: 15px;

    border-right: 1px solid #e4e0e0;
  }
`

export default HomeLayout
