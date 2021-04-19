import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  number: number
  days: number
}

const name: React.FC<Props> = ({ className, number, days }) => (
  <div className={classNames(s.container, className)}>
    <div className={s.number}>{number}</div>
    <div className={s.every}>Follow ups every</div>
    <div className={s.days}>{days} Days</div>
  </div>
)

const s = css`
  .container {
    background: #fbfbfb;
    width: 100%;
    padding: 19px 12px 14px 12px;
  }

  .number {
    margin-bottom: 11px;

    text-align: center;
    font-size: 32px;
    font-weight: var(--bold);
  }

  .every {
    text-align: center;
    font-size: 12px;
    line-height: 16px;
  }

  .days {
    text-align: center;
    font-weight: var(--bold);

    font-size: 12px;
    line-height: 16px;
  }
`

export default name
