import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Star from 'src/components/shared-ui/Star'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import { users } from 'src/testData'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
}

const CardMeetingsEvents: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(className, s.container)}>
    <div className={s.subtitle}>Follow Up</div>
    <img
      alt="icon"
      className={s.icon}
      src={require('public/images/meeting.png')}
    />
    <div className={s.title}>Meetings & Events</div>
    <ul className={s.list}>
      <li className={s.item}>
        <Star className={s.start} />
        <div className={s.info}>
          <div className={s.advise}>Send next steps</div>
          <div className={s.event}>Ask for deck</div>
        </div>
        <AvatarsList users={users.slice(0, 3)} />
      </li>
      <li className={s.item}>
        <Star className={s.start} />
        <div className={s.info}>
          <div className={s.advise}>Mark to meet again</div>
          <div className={s.event}>Plan in 30 Days</div>
        </div>
        <AvatarsList users={users.slice(3, 5)} />
      </li>
      <li className={s.item}>
        <Star className={s.start} />
        <div className={s.info}>
          <div className={s.advise}>Make an intro</div>
          <div className={s.event}>View contacts to intro</div>
        </div>
        <AvatarsList users={users.slice(0, 2)} />
      </li>
      <li className={s.item}>
        <Star className={s.start} />
        <div className={s.info}>
          <div className={s.advise}>Say Thank you</div>
          <div className={s.event}>Ask for deck</div>
        </div>
        <AvatarsList users={users.slice(5, 6)} />
      </li>
    </ul>
  </CardContainer>
)

const s = css`
  .container {
    position: relative;
    padding: 24px 21px 25px 9px;
  }

  .subtitle {
    margin-bottom: 11px;

    font-size: 24px;
    line-height: 42px;
    font-weight: var(--bold);
    opacity: 0.6;
  }

  .title {
    padding-right: 100px;
    margin-bottom: 20px;

    font-size: 38px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .icon {
    position: absolute;
    right: 15px;
    top: 20px;
  }

  .list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`

export default CardMeetingsEvents
