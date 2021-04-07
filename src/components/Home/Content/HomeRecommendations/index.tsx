import React from 'react'
import { css } from 'astroturf'
import SmallCard from 'src/components/shared-ui/cards/SmallCard'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

const HomeRecommendations: React.FC = () => {
  const images = [
    {
      id: 1,
      name: 'Landon Tucker',
      image: require('public/images/maker.jpeg'),
    },
    {
      id: 2,
      name: 'Mary Smith',
      image: require('public/images/mary.jpeg'),
    },
    {
      id: 3,
      name: 'Gino Mo',
      image: require('public/images/gino.jpeg'),
    },
  ]
  return (
    <CardContainer className={s.container}>
      <div className={s.title}>Your Weekly Recommendations</div>
      <div className={s.cards}>
        {images.map((item) => (
          <div className={s.column} key={item.id}>
            <SmallCard data={item} />
          </div>
        ))}
      </div>
    </CardContainer>
  )
}

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
