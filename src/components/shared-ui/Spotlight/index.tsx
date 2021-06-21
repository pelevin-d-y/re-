import React from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classnames from 'classnames'
import SpotlightShortCard from './SpotlightShortCard'
import SpotlightLongCard from './SpotlightLongCard'

type Props = {
  className?: string
}

const Spotlight: React.FC<Props> = ({ className }) => (
  <CardContainer className={classnames(className, s.container)}>
    <div className={s.header}>
      <div className={s.title}>Spotlight</div>
      <div className={s.avatar}>
        <img alt="avatar" src={require('public/images/spotlight.png')} />
      </div>
    </div>
    <div className={s.shortCards}>
      <SpotlightShortCard className={s.shortCard} number={50} days={30} />
      <SpotlightShortCard className={s.shortCard} number={123} days={90} />
    </div>
    <div className={s.longCards}>
      <SpotlightLongCard
        className={s.longCard}
        number={245}
        period="6 Months"
      />
      <SpotlightLongCard
        className={s.longCard}
        number={60}
        period="2 Weeks"
        bar={76}
      />
      <SpotlightLongCard
        className={s.longCard}
        number={90}
        period="2 Weeks"
        bar={21}
      />
    </div>
  </CardContainer>
)

const s = css`
  .container {
    padding: 12px 21px 28px 12px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7px;

    line-height: 31px;
  }

  .title {
    font-size: 24px;
    line-height: 31px;
    font-weight: var(--bold);
  }

  .shortCards {
    display: flex;
    flex-flow: row nowrap;
    margin-left: -11px;
    margin-bottom: 8px;
  }

  .shortCard {
    margin-left: 11px;
  }

  .longCard {
    margin-bottom: 8px;
  }

  .avatar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    border: 1px solid #e4e4e4;
    border-radius: 50%;
  }
`

export default Spotlight
