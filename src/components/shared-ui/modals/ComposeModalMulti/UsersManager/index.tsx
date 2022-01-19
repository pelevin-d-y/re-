import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CloseButton from 'src/components/shared-ui/Close'
import Avatar from 'src/components/shared-ui/Avatar'
import Button from 'src/components/shared-ui/Button'
import Search from 'src/components/shared-ui/Search'
import MessageStatus from './MessageStatus'

type Props = {
  className?: string
  selectedContacts: RecommendationUser[] | FormattedContact[]
  removeUser: (user: RecommendationUser | FormattedContact) => void
  selectUser: (user: RecommendationUser | FormattedContact) => void
  addUserHandler: (user: RecommendationUser | FormattedContact) => void
  unselectedContacts: RecommendationUser[] | FormattedContact[] | null
}

const UsersManager: React.FC<Props> = ({
  className,
  selectedContacts,
  removeUser,
  selectUser,
  unselectedContacts,
  addUserHandler,
}) => {
  const getAvatar = (data: RecommendationUser | FormattedContact) => {
    if ('image_url' in data) {
      return data.image_url
    }
    if ('avatar' in data) {
      return data.avatar
    }
    return null
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.searchContainer}>
        <Search
          classes={{ container: s.search, input: s.searchInput }}
          inputPlaceholder="Search contacts to add…"
        />
      </div>
      <div className={s.selected}>
        <div className={s.selectedHeader}>
          <div className={s.sidebarTitle}>Sending to:</div>
          <div className={s.selectedQuantity}>
            {selectedContacts.length} Selected
          </div>
        </div>
        {selectedContacts?.map((item) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => selectUser(item)}
            onKeyDown={() => selectUser(item)}
            className={classNames(s.user, s.selectedUser)}
            key={item.name}
          >
            <Avatar className={s.avatar} image={getAvatar(item)} />
            <div className={s.userInfo}>
              <div className={s.userName}>{item.name}</div>
            </div>
            <CloseButton
              className={s.buttonRemove}
              handler={() => removeUser(item)}
            />
            <MessageStatus className={s.messageStatus} data={item} />
          </div>
        ))}
        <div className={s.selectedActions}>
          <Button variant="outlined">•••</Button>
          <Button variant="outlined">Send to all</Button>
        </div>
      </div>
      <div className={s.selectedHeader}>
        <div className={s.sidebarTitle}>Contacts to send to</div>
      </div>
      {unselectedContacts?.map((item) => (
        <div className={s.user} key={item.name}>
          <Avatar className={s.avatar} image={getAvatar(item)} />
          <div className={s.userInfo}>
            <div className={s.userName}>{item.name}</div>
          </div>
          <Button
            variant="outlined"
            className={s.buttonAdd}
            handler={() => addUserHandler(item)}
          >
            add
          </Button>
        </div>
      ))}
    </div>
  )
}

const s = css`
  .container {
    border-right: 1px solid #d0d0d0;
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .modalHeader {
    color: var(--blue);
  }

  .searchContainer {
    margin-bottom: 32px;
    padding-left: 28px;
    padding-right: 25px;
  }

  .search {
    width: 100%;
  }

  .searchInput {
    width: 100%;
  }

  .avatar {
    margin-right: 18px;
  }

  .userName {
    margin-bottom: 3px;

    font-size: 12px;
    font-weight: var(--bold);
  }

  .userPosition {
    font-size: 11px;
  }

  .selectedActions {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 11px;

    padding: 45px 35px 38px 28px;
  }

  .buttonAdd {
    margin-left: auto;
  }

  .buttonRemove {
    display: none;
    margin-left: auto;
    background: #dae6ff;
    border-radius: 3px;
  }

  .selectedHeader {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding-left: 28px;
    padding-right: 25px;
    margin-bottom: 19px;
  }

  .sidebarTitle {
    color: #acacac;
  }

  .selectedQuantity {
    color: var(--blue);
  }

  .user {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding: 10px 25px 10px 28px;
  }

  .selectedUser {
    border-radius: none;
    border: none;
    background: var(--white);
    cursor: pointer;
    &:hover {
      background: var(--lightBlue);

      .buttonRemove {
        display: block;
      }

      .messageStatus {
        display: none;
      }
    }
  }

  .messageStatus {
    margin-left: auto;
    display: flex;
  }

  .avatar {
    margin-right: 18px;
  }
`

export default UsersManager
