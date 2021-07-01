import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Button from 'src/components/shared-ui/Button'
import Pin from 'src/components/shared-ui/Pin'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
}

const CardShareSmall: React.FC<Props> = ({ className }) => {
  const { dispatch: popupDispatch } = usePopup()
  const { dispatch: usersDispatch } = useUsers()
  const { state } = useClient()

  const contacts = useMemo(() => state?.contacts?.slice(4, 7), [state])

  const openModalHandler = () => {
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: contacts || [] })
    popupDispatch({ type: 'TOGGLE_RECOMMENDATIONS_POPUP' })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <div className={s.header}>
        <div className={s.title}>Share Holiday</div>
        {contacts && (
          <AvatarsList
            className={s.avatars}
            avatarWidth={37}
            avatarHeight={37}
            users={contacts.slice(0, 3)}
          />
        )}
      </div>
      <div className={s.content}>
        <img
          className={s.hamburger}
          src={require('public/images/hamburger.jpeg')}
          alt="hamburger"
        />
        <div className={s.gradient} />
        <img
          className={s.burgerDay}
          src={require('public/images/burgerDay.png')}
          alt="burger-day"
        />
      </div>
      <div className={s.actions}>
        <Pin />
        <Button variant="contained" handler={openModalHandler}>
          Share Holiday
        </Button>
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 10px 19px 24px 28px;
  }

  .header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    margin-bottom: 7px;
  }

  .title {
    font-size: 18px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .content {
    position: relative;
    min-height: 150px;

    margin-right: -19px;
    margin-left: -28px;

    background: #000000;
  }

  .hamburger {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;

    width: 70%;
    height: 100%;

    object-fit: cover;
  }

  .gradient {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 2;

    width: 70%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 54%,
      rgba(14, 17, 72, 0) 89%
    );
  }

  .burgerDay {
    position: absolute;
    top: 15px;
    left: 8px;
    z-index: 3;

    width: 138px;
    height: 83px;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 9px 18px;
    max-width: 100%;
    margin-top: 20px;
  }
`

export default CardShareSmall
