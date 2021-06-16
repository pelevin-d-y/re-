import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'
import UserEvent from 'src/components/shared-ui/UserEvent'
import Pin from 'src/components/shared-ui/Pin'
import CardContainer from '../CardContainer'
import CardActions from '../CardActions'

type Props = {
  className?: string
  image: string
  title: string
  event: string
  avatar: string
  name: string
}

const CardUserEvent: React.FC<Props> = ({
  className,
  image,
  title,
  name,
  event,
  avatar,
}) => (
  <CardContainer className={classNames(className, s.container)}>
    <img alt="icon" className={s.icon} src={image} />
    <Pin className={s.start} />
    <div className={s.title}>{title}</div>
    <Avatar className={s.avatar} image={avatar} />
    <div className={s.name}>{name}</div>
    <UserEvent className={s.event} text={event} />
    <CardActions
      className={s.actions}
      mainAction={() => null}
      mainText="Ask how it went"
    />
  </CardContainer>
)

const s = css`
  .container {
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    padding: 16px 22px 28px 25px;
  }

  .icon {
    position: absolute;
    right: 26px;
    top: 12px;
  }

  .start {
    position: absolute;
    right: 10px;
    top: 76px;
  }

  .title {
    margin-bottom: 12px;

    font-weight: var(--bold);
    font-size: 24px;
    line-height: 42px;
  }

  .avatar {
    margin-bottom: 13px;
  }

  .name {
    margin-bottom: 10px;

    font-weight: var(--bold);
    font-size: 18px;
    line-height: 21px;
  }

  .event {
    margin-bottom: 25px;

    font-size: 16px;
    line-height: 19px;
  }

  .actions {
    max-width: 100%;
    margin-top: auto;
  }
`

export default CardUserEvent
