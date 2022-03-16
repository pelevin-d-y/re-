import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Goal from '../../cards/CardGoals/Goal'
import CardContainer from '../../cards/CardContainer'
import Typography from '../../Typography'
import CardWeeklyOverview from '../../cards/CardWeeklyOverview'
import Img from '../../Img'
import CardCalendar from '../../cards/CardCalendar'

type Props = {
  className?: string
}

const testData = {
  reconnects: 2,
  intros: 1,
  followups: 2,
}

const WeeklyOverview: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(s.container, className)}>
    <Typography className={s.title} fontVariant="damion" styleVariant="h3">
      Weekly Overview
    </Typography>
    <Goal
      className={s.goal}
      from={testData.followups}
      to={10}
      text="Followups"
      period="Messages that need a response"
      barColor="orange"
    />
    <CardWeeklyOverview
      className={s.goal}
      text="Average Response time"
      period="Less than 8 hours"
    >
      <div className={s.respTime}>
        <Typography
          className={s.goodText}
          fontWeight="bold"
          styleVariant="h4"
          fontVariant="gilroy"
        >
          Good
        </Typography>
        <div className={s.hourText}>
          <Typography fontWeight="medium" styleVariant="body3">
            {'<8hr'}
          </Typography>
        </div>
      </div>
    </CardWeeklyOverview>
    <Goal
      className={s.goal}
      from={testData.reconnects}
      to={10}
      text="Reconnects "
      period="Reach out to these old contacts"
      barColor="green"
    />
    <CardWeeklyOverview
      className={s.goal}
      text="Busiest Day"
      period="Which day are you most active"
    >
      <div className={s.respTime}>
        <Typography
          className={s.weekDay}
          fontWeight="bold"
          styleVariant="h4"
          fontVariant="gilroy"
        >
          Monday
        </Typography>
        <Img alt="" img="metric-static/metric-static1.png" />
      </div>
    </CardWeeklyOverview>
    <CardWeeklyOverview
      className={s.goal}
      text="Most Engaged with"
      period="You’ve message 78x this week!"
    >
      <div className={s.avatarsWrapper}>
        <Img
          alt=""
          img="metric-static/metric-static3.png"
          className={classNames(s.avatar, s.avatarOverlay)}
        />
        <Img
          alt=""
          img="metric-static/metric-static4.png"
          className={s.avatar}
        />
      </div>
    </CardWeeklyOverview>
    <CardWeeklyOverview
      className={s.goal}
      text="Most likely to miss you"
      period="You use to talk to Josie 5x a week. What happened?"
    >
      <Img alt="" img="metric-static/metric-static2.png" className={s.avatar} />
    </CardWeeklyOverview>
    <CardWeeklyOverview
      className={s.goal}
      text="Meetings this week"
      period="You been pretty busy!"
    >
      <CardCalendar className={s.calendar} title="Meetings" text="9x" />
    </CardWeeklyOverview>
    <CardWeeklyOverview
      className={s.goal}
      text="New Friend"
      period="You use to talk to Josie 5x a week. What happened?"
    >
      <Img alt="" img="metric-static/metric-static2.png" className={s.avatar} />
    </CardWeeklyOverview>
  </CardContainer>
)

const s = css`
  .container {
    padding: 22px 23px 17px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    width: 100%;
  }

  .title {
    color: var(--primary1);
    margin-bottom: 9px;
  }

  .goal {
    margin-bottom: 8px;
  }

  .respTime {
    text-align: center;
  }

  .goodText {
    margin-bottom: 7px;
    color: var(--success1);
  }

  .hourText {
    background: var(--success2);
    padding: 4px 8px 4px 6px;
    border-radius: 4px;
    color: var(--success1);
  }

  .weekDay {
    color: var(--primary1);
    margin-bottom: 13px;
  }

  .avatar {
    width: 59px;
    height: 52px;
  }

  .avatarOverlay {
    margin-right: -15px;
  }

  .calendar {
    width: 60px;
    height: 50px;
  }
`

export default WeeklyOverview
