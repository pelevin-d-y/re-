import React from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Link from 'next/link'
import classnames from 'classnames'
import MetricsShortCard from './MetricsShortCard'
import MetricsLongCard from './MetricsLongCard'

type Props = {
  className?: string
}

const Metrics: React.FC<Props> = ({ className }) => (
  <CardContainer className={classnames(className, s.container)}>
    <div className={s.header}>
      <div className={s.title}>Metrics</div>
      <Link href="/">
        <a className={s.link}>View more</a>
      </Link>
    </div>
    <div className={s.shortCards}>
      <MetricsShortCard className={s.shortCard} number={50} days={30} />
      <MetricsShortCard className={s.shortCard} number={123} days={90} />
    </div>
    <div className={s.longCards}>
      <MetricsLongCard className={s.longCard} number={245} period="6 Months" />
      <MetricsLongCard
        className={s.longCard}
        number={60}
        period="2 Weeks"
        bar={76}
      />
      <MetricsLongCard
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
    align-items: flex-end;
    margin-bottom: 7px;

    line-height: 31px;
  }

  .title {
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

  .link {
    font-size: 12px;
    color: var(--blue);
    text-decoration: none;
  }
`

export default Metrics
