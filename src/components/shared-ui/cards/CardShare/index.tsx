import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Socials from 'src/components/shared-ui/Socials'
import ShareLink from 'src/components/shared-ui/ShareLink'
import { useClient } from 'src/components/context/ClientContext'
import Img from 'src/components/shared-ui/Img'
import CardActions from '../CardActions'

type Props = {
  className?: string
  variant: 'dark' | 'light'
  image: string
  title: string
  event: string
  link?: string
}

const CardShare: React.FC<Props> = ({
  className,
  variant,
  image,
  title,
  event,
  link,
}) => {
  const { dispatch: popupDispatch } = usePopup()
  const { dispatch: usersDispatch } = useUsers()
  const { state } = useClient()

  const openModalHandler = () => {
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: state?.contacts || [] })
    popupDispatch({ type: 'TOGGLE_RECOMMENDATIONS_POPUP' })
  }

  return (
    <CardContainer
      className={classNames(
        s.container,
        variant === 'dark' ? s.dark : s.light,
        className
      )}
    >
      <div className={s.info}>
        <div className={s.cardEvent}>{event}</div>
        <div className={s.title}>{title}</div>
        <Img alt="fintech" className={s.cardImage} img={image} />
      </div>
      <div className={s.actions}>
        <div className={classNames(s.topLine, s.line)}>
          {state?.contacts && (
            <AvatarsList
              avatarHeight={47}
              avatarWidth={47}
              className={s.avatars}
              users={state.contacts}
            />
          )}
          <Socials />
        </div>
        <div className={classNames(s.bottomLine, s.line)}>
          <CardActions
            mainAction={openModalHandler}
            mainText="Follow up with all"
            className={s.buttons}
          />
          {link && <ShareLink link={link} />}
        </div>
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    overflow: hidden;
    position: relative;
  }

  .star {
    position: absolute;
    top: 14px;
    right: 17px;
    z-index: 10;
  }

  .info {
    position: relative;
    padding: 26px 24px 75px 15px;
    margin-bottom: -37px;
  }

  .cardImage {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 24px;

    @include mobile {
      display: none;
    }
  }

  .cardEvent {
    font-size: 24px;
    line-height: 42px;
    font-weight: var(--semibold);
  }
  .title {
    font-size: 32px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .button {
    margin-left: 17px;
  }

  .buttonList {
    max-width: 70%;
    width: 100%;
  }

  .line {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

    @include mobile {
      flex-flow: column nowrap;
      align-items: flex-start;
    }
  }

  .topLine {
    margin-bottom: 16px;
    align-items: flex-end;

    @include mobile {
      align-items: flex-start;
    }
  }

  .bottomLine {
    @include mobile {
      flex-direction: column-reverse;
    }
  }

  .avatars {
    margin-bottom: 8px;
  }

  .buttons {
    margin-top: 20px;
  }

  .buttonDots {
    max-width: 30%;
    width: 100%;
  }

  .actions {
    padding: 0 24px 17px 15px;
  }

  .dark {
    .info {
      color: var(--white);
      background: #171d23;
    }
  }

  .light {
    .info {
      color: var(--black);
      background: var(--white);
    }
  }
`

export default CardShare
