import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props {}

const Content = ({}: Props) => {
  return (
    <div className={styles.container}>Container</div>
  )
}

const styles = css`
  .container {
    width: 70%;
  }
`

export default Content
