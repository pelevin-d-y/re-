import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Button from 'src/components/shared-ui/Button'
import Pin from 'src/components/shared-ui/Pin'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import { useClient } from 'src/components/context/ClientContext'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
}

const CardItsBeen: React.FC<Props> = ({ className }) => {
  const { dispatch: popupDispatch } = usePopup()
  const { dispatch: usersDispatch } = useUsers()
  const { state } = useClient()
  const contacts = useMemo(() => state?.contacts?.slice(0, 4), [state])

  const openModalHandler = () => {
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: contacts || [] })
    popupDispatch({ type: 'TOGGLE_RECOMMENDATIONS_POPUP' })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <div className={s.header}>
        <div className={s.cardName}>It’s been</div>
        <div className={s.title}>Awhile...</div>
        <div className={s.description}>
          It’s been awhile since you talked to these people. Check in on how
          they’re doing!
        </div>
      </div>
      {contacts && (
        <AvatarsList
          className={s.avatars}
          avatarWidth={37}
          avatarHeight={37}
          users={contacts}
        />
      )}
      <div className={s.actions}>
        <Pin />
        <Button variant="outlined" handler={openModalHandler}>
          View List
        </Button>
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: column nowrap;

    overflow: hidden;
    position: relative;
    padding: 10px 19px 24px 28px;
  }

  .star {
    position: absolute;
    top: 14px;
    right: 17px;
    z-index: 10;
  }

  .header {
    position: relative;
    margin-bottom: 20px;
  }

  .clock {
    width: 66px;
    height: 66px;
    color: #4da9ff;
  }

  .cardName {
    font-size: 24px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .title {
    margin-bottom: 15px;

    font-size: 36px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .avatars {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 18px;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 9px 18px;
    max-width: 100%;

    margin-top: auto;
  }

  .button {
    margin-left: 17px;
  }

  .buttonList {
    max-width: 70%;
    width: 100%;
  }

  .buttonDots {
    max-width: 30%;
    width: 100%;
  }
`

export default CardItsBeen
