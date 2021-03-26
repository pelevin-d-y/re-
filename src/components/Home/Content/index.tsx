import React from 'react'
import { css } from 'astroturf'
import HomeRecommendations from './HomeRecommendations'
import HomeUpcoming from './HomeUpcoming'

const Content: React.FC = () => (
  <div className={s.container}>
    <HomeRecommendations />
    <HomeUpcoming />
  </div>
)

const s = css`
  .container {
    width: 70%;
    padding: 0 12px 12px 0;
  }
`

export default Content
