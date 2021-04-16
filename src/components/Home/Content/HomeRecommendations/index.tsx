import React from 'react'
import { css } from 'astroturf'
import SmallCard from 'src/components/shared-ui/cards/SmallCard'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { users } from 'src/testData'

const HomeRecommendations: React.FC = () => (
  <CardContainer className={s.container}>
    <div className={s.title}>Your Weekly Recommendations</div>
    <div className={s.cards}>
      {users.slice(0, 3).map((item) => (
        <div className={s.column} key={item.id}>
          <SmallCard data={item} />
        </div>
      ))}
    </div>
  </CardContainer>
)

const s = css`
  .container {
    padding: 22px 35px 44px 35px;
    background: url('/svg/circles-background.svg') no-repeat center/cover;
  }

  .title {
    margin-bottom: 18px;
    font-size: 26px;
    font-weight: var(--bold);
  }

  .cards {
    display: flex;
    flex-flow: row nowrap;
    margin-left: -17px;
  }

  .column {
    width: 33.3%;
    margin-left: 17px;
  }
`

export default HomeRecommendations
