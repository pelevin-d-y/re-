import React from 'react'
import Header from 'src/components/shared-ui/Header'
import Sidebar from 'src/components/shared-ui/Sidebar'
import { css } from 'astroturf'

const HomeLayout: React.FC = ({ children }) => (
  <div className={styles.root}>
    <Sidebar className={styles.sidebar} />
    <div className={styles.main}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  </div>
)

const styles = css`
  .root {
    min-height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    padding-left: 300px;
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

  .content {
    display: flex;
    flex-flow: row nowrap;
    max-width: 1400px;
    width: 100%;
    padding: 20px;
  }
`

export default HomeLayout
