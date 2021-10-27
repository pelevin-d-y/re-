import React, { useState, useEffect } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'

import { useUsers } from 'src/components/context/UsersContext'
import ModalClose from 'src/components/shared-ui/Close'
import MessageManager from 'src/components/shared-ui/modals/MessageManager'

import { differenceWith } from 'lodash'
import ModalUserInfo from '../ModalUserInfo'
import ModalBase from '../ModalBase'
import SelectedContacts from './SelectedContacts'

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

  const removeUser = (user: UserData) => {
    setSelectedContacts(
      selectedContacts.filter((item) => item.name !== user.name)
    )
    if (contacts) {
      setContacts([...contacts, user])
    }
  }

  const closeHandler = () => {
    setSelectedContacts([])
    dispatch({ type: 'UPDATE_POPUP_DATA', payload: null })
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
      <SelectedContacts
        selectedContacts={selectedContacts}
        removeUser={removeUser}
        selectUser={selectUser}
        contacts={contacts}
        addUserHandler={addUserHandler}
      />
      <div className={s.content}>
        {data?.templateData?.Subject && (
          <ModalUserInfo className={s.header} data={data} />
        )}

        {data && <MessageManager data={data} closeHandler={closeHandler} />}
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

  .content {
    padding: 29px 30px 15px;
  }

  .header {
    padding-right: 33px;
  }
`

export default MultiEmailsModal
