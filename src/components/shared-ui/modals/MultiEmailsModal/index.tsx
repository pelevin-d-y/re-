import React, { useState, useEffect } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/helpers/context/PopupContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import { useUsers } from 'src/helpers/context/UsersContext'
import Avatar from 'src/components/shared-ui/Avatar'
import Search from 'src/components/shared-ui/Search'
import classNames from 'classnames'
import ModalMoreInfo from '../ModalMoreInfo'
import HtmlEditorModal from '../ModalHtmlEditor'
import ModalUserInfo from '../ModalUserInfo'
import ModalEditorHeader from '../ModalEditorHeader'
import ModalBase from '../ModalBase'

const MultiEmailsModal: React.FC = () => {
  const { toggleMultiEmailsPopup, state } = usePopup()
  const { data, multiEmailsIsOpen } = state
  const { state: users } = useUsers()
  const { data: usersData } = users

  const [filteredUsers, setFilteredUsers] = useState(usersData)

  const [selectedUsers, setSelectedUsers] = useState(
    usersData.length ? [usersData?.[0]] : []
  )

  useEffect(() => {
    if (usersData.length) {
      setSelectedUsers([usersData?.[0]])
    }
  }, [usersData])

  useEffect(() => {
    if (usersData.length) {
      setFilteredUsers(usersData)
    }
  }, [setFilteredUsers, usersData])

  const addUserHandler = (user: {
    name?: string
    image?: string
    description?: string
  }) => {
    const isInclude = selectedUsers.find((item) => item.name === user.name)
    if (!isInclude) {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={multiEmailsIsOpen}
      onClose={toggleMultiEmailsPopup}
    >
      <div className={s.sidebar}>
        <div className={s.searchContainer}>
          <Search
            className={s.search}
            inputClassName={s.searchInput}
            inputPlaceholder="Search contacts to add…"
          />
        </div>
        <div className={s.selected}>
          <div className={s.selectedHeader}>
            <div className={s.sidebarTitle}>Sending to:</div>
            <div className={s.selectedQuantity}>4 Selected</div>
          </div>
          {selectedUsers?.map((item) => (
            <div className={classNames(s.user, s.selectedUser)} key={item.name}>
              <Avatar className={s.avatar} image={item.image} />
              <div className={s.userInfo}>
                <div className={s.userName}>{item.name}</div>
                <div className={s.userDescription}>{item.description}</div>
              </div>
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
        {filteredUsers?.map((item) => (
          <div className={s.user} key={item.name}>
            <Avatar className={s.avatar} image={item.image} />
            <div className={s.userInfo}>
              <div className={s.userName}>{item.name}</div>
              <div className={s.userDescription}>{item.description}</div>
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
        <ModalUserInfo className={s.header} />
        <CardContainer className={s.textContainer}>
          <ModalEditorHeader name={data.name} />
          <HtmlEditorModal className={s.editor} name={data.name} />
          <div className={s.buttons}>
            <Button variant="contained" size="medium" className={s.buttonSend}>
              Send
            </Button>
          </div>
        </CardContainer>
        <ModalMoreInfo className={s.moreInfo} />
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

  .sidebar {
    border-right: 1px solid #d0d0d0;
    padding-top: 36px;
    padding-bottom: 36px;
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

  .user {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px 25px 10px 28px;
  }

  .selectedUser {
    cursor: pointer;
    &:hover {
      background: #f5f5f5;
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

  .userDescription {
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
    padding: 29px 30px 0;
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
`

export default MultiEmailsModal
