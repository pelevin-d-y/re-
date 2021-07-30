import React, { useState, useEffect, MouseEvent } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import Button from 'src/components/shared-ui/Button'
import { useUsers } from 'src/components/context/UsersContext'
import Avatar from 'src/components/shared-ui/Avatar'
import Search from 'src/components/shared-ui/Search'
import ModalClose from 'src/components/shared-ui/Close'
import MessageManager from 'src/components/shared-ui/modals/MessageManager'
import classNames from 'classnames'
import { differenceWith } from 'lodash'
import ModalUserInfo from '../ModalUserInfo'
import ModalBase from '../ModalBase'

const comparator = (a: UserData, b: UserData) => a.address === b.address

const MultiEmailsModal: React.FC = () => {
  const { state, dispatch } = usePopup()
  const { data, multiEmailsIsOpen } = state

  const { state: users, dispatch: usersDispatch } = useUsers()
  const { data: usersData } = users

  const [contacts, setContacts] = useState<UserData[] | null>([])

  const [selectedContacts, setSelectedContacts] = useState<UserData[]>([])

  useEffect(() => {
    if (usersData?.length) {
      if (contacts) {
        const filteredUsers = differenceWith(usersData, contacts, comparator)
        setSelectedContacts(filteredUsers)
      }
    }
  }, [contacts, setContacts, usersData])

  useEffect(() => {
    if (selectedContacts?.length) {
      dispatch({
        type: 'UPDATE_POPUP_DATA',
        payload: selectedContacts[0],
      })
    }
  }, [dispatch, selectedContacts])

  const selectUser = (user: UserData) => {
    if (user?.templateData) {
      dispatch({
        type: 'UPDATE_POPUP_DATA',
        payload: {
          ...user,
          templateData: user.templateData,
        },
      })
    }
  }

  const addUserHandler = (user: UserData) => {
    const isInclude = selectedContacts.find((item) => item.name === user.name)
    if (!isInclude) {
      setSelectedContacts([...selectedContacts, user])
      if (contacts) {
        setContacts(contacts.filter((item) => item.name !== user.name))
      }
      selectUser(user)
    }
  }

  const removeUser = (user: UserData, e: MouseEvent) => {
    e.stopPropagation()
    setSelectedContacts(
      selectedContacts.filter((item) => item.name !== user.name)
    )
    if (contacts) {
      setContacts([...contacts, user])
    }
  }

  const closeHandler = () => {
    setSelectedContacts([])
    dispatch({ type: 'UPDATE_POPUP_DATA', payload: {} })
    setContacts([])
    dispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={multiEmailsIsOpen}
      onClose={closeHandler}
    >
      <ModalClose handler={closeHandler} className={s.close} />
      <div className={s.sidebar}>
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
              {item.avatar && (
                <Avatar className={s.avatar} image={item.avatar} />
              )}
              <div className={s.userInfo}>
                <div className={s.userName}>{item.name}</div>
                <div className={s.userPosition}>{item.position}</div>
              </div>
              <ModalClose
                className={s.buttonRemove}
                handler={(e: MouseEvent) => removeUser(item, e)}
              />
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
        {contacts?.map((item) => (
          <div className={s.user} key={item.name}>
            <Avatar className={s.avatar} image={item.avatar} />
            <div className={s.userInfo}>
              <div className={s.userName}>{item.name}</div>
              <div className={s.userPosition}>{item.position}</div>
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
      <div className={s.content}>
        {data?.templateData?.Summary && (
          <ModalUserInfo className={s.header} data={data} />
        )}

        <MessageManager data={data} closeHandler={closeHandler} />
      </div>
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 1055px;
    display: grid;
    grid-template-columns: 2fr 4fr;
  }

  .close {
    position: absolute;
    right: 16px;
    top: 16px;
  }

  .sidebar {
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
      background: #f0f5ff;

      .buttonRemove {
        display: block;
      }
    }
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

  .content {
    padding: 29px 30px 15px;
  }

  .header {
    padding-right: 33px;
  }

  .buttonDots {
    margin-right: 11px;
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
`

export default MultiEmailsModal
