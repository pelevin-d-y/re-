import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Bar from '../Bar'

type Props = {
  className?: string
  period: string
  number?: number
  bar?: number
}

const MetricsLongCard: React.FC<Props> = ({
  className,
  period,
  number,
  bar,
}) => {
  const renderNumber = () => number || '-'
  const renderSlider = () => {
    if (bar) {
      return <Bar bar={bar} className={s.bar} />
    }

    return <div className={s.connection}>1 Connection Overdue</div>
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.text}>
        <div className={s.follow}>
          Follow ups every <span className={s.period}>{period}</span>
        </div>
        {renderSlider()}
      </div>
      <div className={s.number}>{renderNumber()}</div>
    </div>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px 11px 20px;

    background: #fbfbfb;
  }

  .connection {
    color: var(--red);
    line-height: 31px;
  }

  .text {
    font-size: 12px;
  }

  .follow {
    line-height: 16px;
  }

  .period {
    font-weight: var(--bold);
  }

  .number {
    padding-bottom: 8px;

    font-weight: var(--bold);
    font-size: 26px;
    line-height: 31px;
  }

  .bar {
    max-width: 148px;
  }
`

export default MetricsLongCard
