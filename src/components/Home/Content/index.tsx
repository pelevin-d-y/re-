import React from 'react'
import { css } from 'astroturf'
import CardItsBeen from 'src/components/shared-ui/cards/CardItsBeen'
import CardShare from 'src/components/shared-ui/cards/CardShare'
import classNames from 'classnames'
import HomeRecommendations from './HomeRecommendations'
import HomeUpcoming from './HomeUpcoming'
import HomeMeeting from './HomeMeeting'

const Content: React.FC = () => (
  <div className={s.container}>
    <HomeRecommendations />
    <div className={classNames(s.been, s.cards)}>
      <CardItsBeen />
      <CardItsBeen />
    </div>
    <HomeUpcoming className={s.cards} />
    <CardShare />
    <HomeMeeting className={s.cards} />
  </div>
)

const s = css`
  .container {
    width: 70%;
    padding: 0 12px 12px 0;
  }

  .been {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    width: 100%;
    margin-top: 12px;
  }

  .cards {
    margin-top: 12px;
  }
`

export default Content
