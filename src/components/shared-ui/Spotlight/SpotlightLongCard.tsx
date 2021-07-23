import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Bar from '../Bar'
import Period from '../Period'

type Props = {
  className?: string
  barClassName?: string
  period: string
  bar?: number
  text: string
  from: number
  to: number
  barColor: 'blue' | 'green' | 'red'
}

const SpotlightLongCard: React.FC<Props> = ({
  className,
  period,
  text,
  bar,
  barClassName,
  from,
  to,
  barColor,
}) => (
  <div className={classNames(s.container, className)}>
    <div className={s.wrapper}>
      <div className={s.text}>
        <div className={s.subtitle}>{text}</div>
        <div className={s.time}>{period}</div>
      </div>
      <Period className={s.period} from={from} to={to} />
    </div>
    {bar && (
      <Bar
        bar={bar}
        barColor={barColor}
        className={classNames(barClassName, s.bar)}
      />
    )}
  </div>
)

const s = css`
  .container {
    padding: 16px 20px 11px 20px;

    background: #fbfbfb;
  }

  .wrapper {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .connection {
    color: var(--red);
    line-height: 31px;
  }

  .text {
    line-height: 16px;
    font-size: 12px;
  }

  .period {
    padding-bottom: 8px;
  }

  .bar {
    width: 100%;
  }
`

export default SpotlightLongCard
