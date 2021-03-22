import React from 'react'
import { css } from 'astroturf'
import HomeRecommendations from './HomeRecommendations'

const Content = () => {
  return (
    <div className={styles.container}>
      <HomeRecommendations />
    </div>
  )
}

const styles = css`
  .container {
    width: 70%;
  }
`

export default Content
