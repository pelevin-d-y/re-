import React from 'react'
import { css } from 'astroturf'
import HomeRecommendations from './HomeRecommendations'
import HomeUpcoming from './HomeUpcoming'

const Content: React.FC = () => (
  <div className={styles.container}>
    <HomeRecommendations />
    <HomeUpcoming />
  </div>
)

const styles = css`
  .container {
    width: 70%;
    padding: 0 20px 20px 20px;
  }
`

export default Content
