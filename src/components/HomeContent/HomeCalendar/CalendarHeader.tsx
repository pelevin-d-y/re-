import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { format } from 'date-fns'
import CardCalendar from 'src/components/shared-ui/cards/CardCalendar'

type Props = {
  className?: string
  text?: React.ReactElement
}

const UpcomingHeader: React.FC<Props> = ({ className, text }) => {
  const currentDay = new Date()

  return (
    <div className={classNames(className, s.container)}>
      <CardCalendar
        className={s.calendar}
        title={format(currentDay, 'LLLL').substring(0, 3)}
        text={currentDay.getDate()}
      />
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

  .text {
    margin-top: 3px;
    @include mobile {
      text-align: center;
    }
  }

  .calendar {
    margin-right: 28px;

    @include mobile {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`

export default UpcomingHeader
