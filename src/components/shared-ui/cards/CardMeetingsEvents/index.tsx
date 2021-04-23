import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Star from 'src/components/shared-ui/Star'
import CardContainer from '../CardContainer'
import Events from './Events'

type Props = {
  className?: string
}

const CardMeetingsEvents: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(className, s.container)}>
    <img
      alt="icon"
      className={s.icon}
      src={require('public/images/meeting.png')}
    />
    <Star className={s.star} />
    <div className={s.header}>
      <div className={s.subtitle}>Follow Up</div>
      <div className={s.title}>Meetings &&nbsp;Events</div>
    </div>
    <Events />
  </CardContainer>
)

const s = css`
  .container {
    position: relative;
    padding: 24px 21px 25px 9px;
  }

  .header {
    padding-left: 20px;
    padding-right: 100px;
  }

  .subtitle {
    margin-bottom: 11px;

    font-size: 24px;
    line-height: 42px;
    font-weight: var(--bold);
    opacity: 0.6;
  }

  .title {
    margin-bottom: 20px;

    font-size: 38px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .star {
    position: absolute;
    top: 14px;
    right: 17px;
  }

  .icon {
    position: absolute;
    right: 15px;
    top: 61px;
  }
`

export default CardMeetingsEvents
