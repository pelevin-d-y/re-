import React, { useState, useEffect } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import ModalClose from 'src/components/shared-ui/Close'

import { differenceWith } from 'lodash'
import ModalBase from '../ModalBase'
import UsersManager from './UsersManager'
import ModalContent from '../ModalContent'

const comparator = (
  a: FormattedContacts | UserData,
  b: FormattedContacts | UserData
) => a.contact_id === b.contact_id

const ComposeModalMulti: React.FC = () => {
  const { state, dispatch } = usePopup()
  const { data: popupData, dataMulti: usersData, multiEmailsIsOpen } = state

  const [unselectedContacts, setUnselectedContacts] = useState<
    Array<FormattedContacts | UserData>
  >([])

  const [selectedContacts, setSelectedContacts] = useState<
    Array<FormattedContacts | UserData>
  >([])

  useEffect(() => {
    if (usersData?.length) {
      if (unselectedContacts) {
        const filteredUsers = differenceWith<
          FormattedContacts | UserData,
          FormattedContacts | UserData
        >(usersData, unselectedContacts, comparator)
        setSelectedContacts(filteredUsers)
      }
    }
  }, [unselectedContacts, setUnselectedContacts, usersData])

  useEffect(() => {
    if (selectedContacts?.length) {
      dispatch({
        type: 'UPDATE_POPUP_DATA',
        payload: selectedContacts[0],
      })
    }
  }, [dispatch, selectedContacts, multiEmailsIsOpen])

  const selectUser = (user: UserData | FormattedContacts) => {
    if ('templateData' in user && user?.templateData) {
      dispatch({
        type: 'UPDATE_POPUP_DATA',
        payload: {
          ...user,
          templateData: user.templateData,
        },
      })
    }
  }

  const addUserHandler = (user: UserData | FormattedContacts) => {
    const isInclude = selectedContacts.find(
      (item) => item.contact_id === user.contact_id
    )
    if (!isInclude) {
      setSelectedContacts([...selectedContacts, user])
      if (unselectedContacts) {
        setUnselectedContacts(
          unselectedContacts.filter(
            (item) => item.contact_id !== user.contact_id
          )
        )
      }
      selectUser(user)
    }
  }

  const removeUser = (user: UserData | FormattedContacts) => {
    setSelectedContacts(
      selectedContacts.filter((item) => item.contact_id !== user.contact_id)
    )
    if (unselectedContacts) {
      setUnselectedContacts([...unselectedContacts, user])
    }
  }

  const closeHandler = () => {
    setSelectedContacts([])
    setUnselectedContacts([])
    dispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={multiEmailsIsOpen}
      onClose={closeHandler}
    >
      <UsersManager
        selectedContacts={selectedContacts}
        removeUser={removeUser}
        selectUser={selectUser}
        unselectedContacts={unselectedContacts}
        addUserHandler={addUserHandler}
      />
      {popupData && (
        <ModalContent
          data={popupData}
          withAvatar={false}
          closeHandler={closeHandler}
        />
      )}
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
`

export default ComposeModalMulti
