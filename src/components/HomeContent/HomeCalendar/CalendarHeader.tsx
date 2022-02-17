import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { format } from 'date-fns'

type Props = {
  className?: string
  text?: React.ReactElement
}

const UpcomingHeader: React.FC<Props> = ({ className, text }) => {
  const currentDay = new Date()

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.date}>
        <div className={s.month}>
          {format(currentDay, 'LLLL').substring(0, 3)}
        </div>
        <div className={s.day}>{currentDay.getDate()}</div>
      </div>
      <div className={s.text}>{text}</div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    padding: 12px 16px 10px 16px;
    @include mobile {
      flex-flow: column nowrap;
      align-items: center;
    }
  }
  .date {
    display: flex;
    flex-flow: column nowrap;
    min-width: 45px;
    margin-right: 28px;
    overflow: hidden;
    background: var(--white);
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
    @include mobile {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
  .text {
    margin-top: 3px;
    @include mobile {
      text-align: center;
    }
  }
  .month {
    padding: 2px 0;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    background: #ff0000;
    color: var(--white);
  }
  .day {
    padding: 4px;
    line-height: 24px;
    text-align: center;
    font-size: 20px;
    font-weight: var(--bold);
  }
  .smallText {
    font-size: 12px;
    line-height: 22px;
  }
`

export default UpcomingHeader
