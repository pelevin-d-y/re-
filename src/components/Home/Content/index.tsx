import React from 'react'
import { css } from 'astroturf'
import CardItsBeen from 'src/components/shared-ui/cards/CardItsBeen'
import CardShare from 'src/components/shared-ui/cards/CardShare'
import classNames from 'classnames'
import HomeRecommendations from './HomeRecommendations'
import HomeUpcoming from './HomeUpcoming'
import HomeMeeting from './HomeMeeting'
import HomeTripleCards from './HomeTripleCards'

const Content: React.FC = () => (
  <div className={s.container}>
    <HomeRecommendations />
    <div className={classNames(s.been, s.cards)}>
      <CardItsBeen />
      <CardItsBeen />
    </div>
    <HomeUpcoming className={s.cards} />
    <CardShare
      className={s.cards}
      variant="light"
      image={require('public/images/fintech.png')}
      event="Celebrate this crazy holiday!"
      title="Share with your friends"
      link="https://www.google.com/"
    />
    <HomeMeeting className={s.cards} />
    <CardShare
      className={s.cards}
      variant="dark"
      image={require('public/images/fintech.png')}
      event="James was mentioned on Techcrunch"
      title="Fintech Startup get acquired"
      link="https://slack.com/"
    />
    <HomeTripleCards className={s.cards} />
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    width: 70%;
    padding: 0 12px 12px 0;

    @include tablet {
      padding-right: 0;
      width: 100%;
    }
  }

  .been {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    width: 100%;

    @include mobile {
      grid-template-columns: auto;
    }
  }

  .cards {
    margin-top: 12px;
  }
`

export default Content
