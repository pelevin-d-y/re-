import React from 'react'
import { css } from 'astroturf'
import CardItsBeen from 'src/components/shared-ui/cards/CardItsBeen'
import HomeRecommendations from './HomeRecommendations'
import HomeUpcoming from './HomeUpcoming'

const Content: React.FC = () => (
  <div className={s.container}>
    <HomeRecommendations />
    {/* <HomeUpcoming /> */}
    <div className={s.been}>
      <CardItsBeen className={s.cardBeen} />
      <CardItsBeen className={s.cardBeen} />
    </div>
  </div>
)

const s = css`
  .container {
    width: 70%;
    padding: 0 12px 12px 0;
  }

  .been {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 12px;
    margin-left: -15px;
  }

  .cardBeen {
    width: 50%;
    margin-left: 15px;
  }
`

export default Content
