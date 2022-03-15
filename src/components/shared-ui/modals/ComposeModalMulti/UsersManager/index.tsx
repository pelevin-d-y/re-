import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CloseButton from 'src/components/shared-ui/Close'
import Avatar from 'src/components/shared-ui/Avatar'
import Button from 'src/components/shared-ui/Button'
import { getName } from 'src/helpers/utils/get-name'
import { usePopup } from 'src/components/context/PopupContext'
import AddUserView from 'src/components/shared-ui/AddUserView'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Typography from 'src/components/shared-ui/Typography'
import MessageStatus from './MessageStatus'

type Props = {
  className?: string
  selectedContacts: (RecommendationUser | FormattedContact)[]
  removeUser: (user: RecommendationUser | FormattedContact) => void
  selectUser: (user: RecommendationUser | FormattedContact) => void
  addUserHandler: (user: RecommendationUser | FormattedContact) => void
  unselectedContacts: (RecommendationUser | FormattedContact)[] | null
}

const UsersManager: React.FC<Props> = ({
  className,
  selectedContacts,
  removeUser,
  selectUser,
  unselectedContacts,
  addUserHandler,
}) => {
  const { state, dispatch } = usePopup()
  const { dataMulti } = state

  const getAvatar = (data: RecommendationUser | FormattedContact) => {
    if ('image_url' in data) {
      return data.image_url
    }
    if ('avatar' in data) {
      return data.avatar
    }
    return null
  }

  const searchAddHandler = (user: any) => {
    // TODO: fix user: any
    if (dataMulti) {
      dispatch({
        type: 'UPDATE_COMPOSE_MULTI_DATA',
        payload: [...dataMulti, user],
      })
    }
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.searchContainer}>
        <AddUserView data={dataMulti} handler={searchAddHandler} />
      </div>
      <div className={s.selected}>
        <div className={s.selectedHeader}>
          <div className={s.sidebarTitle}>Sending to</div>
          <div className={s.selectedQuantity}>
            {selectedContacts.length} Selected
          </div>
        </div>
        <div className={s.selectedUsers}>
          {selectedContacts?.map((item) => (
            <div
              role="button"
              tabIndex={0}
              onClick={() => selectUser(item)}
              onKeyDown={() => selectUser(item)}
              className={classNames(
                s.user,
                s.selectedUser,
                item.contact_id === state.data?.contact_id && s.activeUser
              )}
              key={item.contact_id}
            >
              <Avatar
                className={s.avatar}
                name={getName(item)}
                image={getAvatar(item)}
              />
              <div className={s.userInfo}>
                <div className={s.userName}>{getName(item)}</div>
                <MessageStatus className={s.messageStatus} data={item} />
              </div>
              <CloseButton
                className={s.buttonRemove}
                handler={() => removeUser(item)}
              />
              <div className={s.messageSent}>
                {item.isSent && (
                  <>
                    <Typography
                      className={s.sentText}
                      fontVariant="inter"
                      styleVariant="body4"
                    >
                      Sent!
                    </Typography>
                    <SvgIcon className={s.icon} icon="message-sent.svg" />
                  </>
                )}
                {!item.isSent && (
                  <SvgIcon className={s.icon} icon="message.svg" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {unselectedContacts?.length !== 0 && (
        <div className={s.selectedHeader}>
          <div className={s.sidebarTitle}>Contacts to send to</div>
        </div>
      )}
      {unselectedContacts?.map((item) => (
        <div className={s.user} key={item.contact_id}>
          <Avatar className={s.avatar} image={getAvatar(item)} />
          <div className={s.userInfo}>
            <div className={s.userName}>{getName(item)}</div>
          </div>
          <Button
            variant="outlined"
            className={s.buttonAdd}
            handler={() => addUserHandler(item)}
          >
            Add
          </Button>
        </div>
      ))}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    border-right: 1px solid #d0d0d0;
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .modalHeader {
    color: var(--primary1);
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

    @include mobile {
      margin-right: 10px;
    }
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

  .selectedUsers {
    overflow: scroll;
    max-height: 320px;
    margin-bottom: 41px;
  }

  .selectedQuantity {
    color: var(--primary1);
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }

  .user {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding: 10px 25px 10px 28px;
  }

  .selectedUser {
    position: relative;
    border-radius: none;
    border: none;
    background: var(--shades2);
    cursor: pointer;
    &:hover {
      background: var(--primary2);

      .buttonRemove {
        display: block;
      }
    }
    @include mobile {
      .buttonRemove {
        display: block !important;
      }
    }
  }

  .activeUser {
    background: var(--primary2);
  }

  .messageStatus {
    margin-left: auto;
    display: flex;
  }

  .avatar {
    margin-right: 18px;
  }

  .sentText {
    margin-right: 6px;
  }

  .messageSent {
    color: #2bb774;
    margin-left: auto;
    display: flex;
    align-items: center;

    @include mobile {
      display: none;
    }
  }
`

export default UsersManager
