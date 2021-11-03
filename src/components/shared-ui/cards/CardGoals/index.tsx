import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Goal from './Goal'
import CardContainer from '../CardContainer'
import CardSwitcher from '../CardSwitcher'

type Props = {
  className?: string
}

const testData = {
  reconnects: 4,
  intros: 1,
  followups: 9,
}

const CardGoals: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(s.container, className)}>
    <div className={s.header}>
      <div className={s.title}>Goal</div>
      <CardSwitcher prevHandler={() => null} nextHandler={() => null} />
    </div>
    <Goal
      className={s.goal}
      from={testData.reconnects}
      to={20}
      period="this month"
      text="Intros Made"
      barColor="orange"
    />
    <Goal
      className={s.goal}
      from={testData.intros}
      to={2}
      period="this month"
      text="Poker nights "
      barColor="blue"
    />
    <Goal
      className={s.goal}
      from={testData.followups}
      to={10}
      period="made within 30 Days"
      text="Urgent followup"
      barColor="green"
    />
  </CardContainer>
)

const s = css`
  .container {
    padding: 15px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    width: 100%;
  }

  .title {
    font-size: 12px;
    color: #c5c5c5;
    font-weight: var(--semibold);
  }

  .goal {
    margin-bottom: 8px;
  }
`

export default CardGoals
