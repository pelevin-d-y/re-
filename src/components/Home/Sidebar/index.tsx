import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props {}

const ContentSidebar = ({}: Props) => {
  return (
    <div className={styles.container}>
      Sidebar
    </div>
  ) 
}

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
