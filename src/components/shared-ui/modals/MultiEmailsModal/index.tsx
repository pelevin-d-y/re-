import React, { useState, useEffect, MouseEvent } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import { useUsers } from 'src/components/context/UsersContext'
import Avatar from 'src/components/shared-ui/Avatar'
import Search from 'src/components/shared-ui/Search'
import ModalClose from 'src/components/shared-ui/Close'
import EditorActions from 'src/components/shared-ui/EditorActions'
import classNames from 'classnames'
import ModalHtmlEditor from '../ModalHtmlEditor'
import ModalUserInfo from '../ModalUserInfo'
import ModalEditorHeader from '../ModalEditorHeader'
import ModalBase from '../ModalBase'
import ModalSent from '../ModalSent'

const MultiEmailsModal: React.FC = () => {
  const { state, dispatch } = usePopup()
  const { data, multiEmailsIsOpen } = state
  const { state: users } = useUsers()
  const { data: usersData } = users
  const [isSent, setIsSent] = useState(false)

  const [contacts, setContacts] = useState(usersData)

  const [selectedContacts, setSelectedContacts] = useState<UserData[]>([])

  useEffect(() => {
    if (usersData?.length) {
      setContacts(usersData)
    }
    return () => {
      setSelectedContacts([])
    }
  }, [setContacts, usersData])

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
    setContacts(usersData)
    dispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
    setIsSent(false)
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
        {!isSent ? (
          <CardContainer className={s.textContainer}>
            {data && <ModalEditorHeader data={data} />}
            <ModalHtmlEditor className={s.editor} data={data} toParse />
            <div className={s.buttons}>
              <EditorActions className={s.editorActions} />
              <Button
                variant="contained"
                className={s.buttonSend}
                handler={() => setIsSent(true)}
              >
                Send
              </Button>
            </div>
          </CardContainer>
        ) : (
          selectedContacts && (
            <>
              <ModalSent names={selectedContacts.map((item) => item.name)} />
              <Button
                variant="contained"
                className={s.buttonBack}
                handler={closeHandler}
              >
                Back to home
              </Button>
            </>
          )
        )}
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

  .textContainer {
    overflow: hidden;
    margin-top: 22px;
    padding: 0 0 23px;

    border: 1px solid #f1f1f1;
    border-top: none;
  }

  .content {
    padding: 29px 30px 15px;
  }

  .header {
    padding-right: 33px;
  }

  .editor {
    width: 100%;
    min-height: 220px;
    margin-top: 18px;
    margin-bottom: 25px;
    padding-left: 23px;
    padding-right: 25px;
    outline: none;
    border: none;
    resize: none;
  }

  .buttons {
    padding-left: 23px;
    padding-right: 25px;
    text-align: right;
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

  .buttonBack {
    display: block;
    max-width: 182px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 35px;
  }

  .buttons {
    display: flex;
    flex-flow: row wrap;
  }

  .buttonSend {
    max-width: 140px;
    width: 100%;

    margin-left: auto;
  }
`

export default MultiEmailsModal
