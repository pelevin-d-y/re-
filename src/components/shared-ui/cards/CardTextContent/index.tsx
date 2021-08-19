import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Button from 'src/components/shared-ui/Button'
import Pin from 'src/components/shared-ui/Pin'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import Tasks from '../../Tasks'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
  title: string
  subtitle: string
  description: string
  users?: UserData[]
}

const CardTextContent: React.FC<Props> = ({
  className,
  title,
  subtitle,
  description,
  users,
}) => {
  const { dispatch: popupDispatch } = usePopup()
  const { dispatch: usersDispatch } = useUsers()

  const openModalHandler = () => {
    popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: null })
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: users || [] })
    popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <div className={s.header}>
        <div className={s.cardName}>{title}</div>
        <Tasks data={{ urgent: 3, pinned: 1 }} />
      </div>
      <div className={s.title}>{subtitle}</div>
      <div className={s.description}>{description}</div>
      {users && (
        <AvatarsList
          className={s.avatars}
          avatarWidth={37}
          avatarHeight={37}
          users={users}
        />
      )}
      <div className={s.actions}>
        <Pin className={s.pin} />
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
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 8px;
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
    margin-top: 20px;
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

export default CardTextContent
