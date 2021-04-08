import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import ImportantCard from './ImportantCard'

interface Props {
  className?: string
}

const cards = [
  {
    image: require('public/images/gino.jpeg'),
    name: 'Landon Tucker',
    event: 'Follow up on Meetings',
  },
  {
    image: require('public/images/maker.jpeg'),
    name: 'Taylor Smith',
    event: 'Moved to Austin, Texas',
  },
  {
    image: require('public/images/hamburger.jpeg'),
    name: 'Gino Mo',
    event: 'National Cheeseburger Day',
  },
  {
    image: require('public/images/travel.png'),
    name: 'James Malone',
    event: 'Reach out to people in LA while you are there',
  },
]

const ImportantSteps: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(className, s.container)}>
    <div className={s.header}>
      <div className={s.headerText}>
        <div className={s.headerImportant}>Important</div>
        <div className={s.headerNext}>Next Steps</div>
      </div>
      <div className={s.headerStar}>
        <SvgIcon
          className={s.headerStarIcon}
          icon={require('public/svg/star.svg?include')}
        />
      </div>
    </div>
    <div className={s.cards}>
      {cards.map((item) => (
        <ImportantCard
          className={s.card}
          key={item.event}
          name={item.name}
          event={item.event}
          image={item.image}
        />
      ))}
    </div>
  </CardContainer>
)

const s = css`
  .container {
    padding: 24px 13px 22px 16px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
  }

  .headerText {
    font-weight: var(--bold);
    font-size: 24px;
    line-height: 31px;
  }

  .headerNext {
    color: var(--ginger);
  }

  .headerStar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 13px;

    border-radius: 50%;
    border: 1px solid #e4e4e4;
  }

  .headerStarIcon {
    width: 23px;
    height: 23px;
    color: var(--ginger);
  }

  .cards {
    margin-top: 19px;
  }

  .card {
    margin-bottom: 5px;
  }
`

export default ImportantSteps
