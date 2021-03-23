import React from 'react'
import { css } from 'astroturf'

const ContentSidebar: React.FC = () => (
  <div className={styles.container}>Sidebar</div>
)

const styles = css`
  .container {
    width: 30%;
    height: 100vh;
    padding: 12px;

    border: 1px solid grey;
    border-radius: 10px;
  }
`

export default ContentSidebar
