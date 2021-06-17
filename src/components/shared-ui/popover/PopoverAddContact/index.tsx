import React, { useMemo } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import { useClient } from 'src/components/context/ClientContext'
import { useLists } from 'src/components/context/ListsContext'
import AddUserView from 'src/components/shared-ui/AddUserView'
import Popover from '../PopoverBase'

type Props = {
  list?: List
  className?: string
  addContactHandler?: (users: UserData[]) => void
}

const PopoverAddContact: React.FC<Props> = ({
  list,
  className,
  addContactHandler,
}) => {
  const { updateList } = useLists()
  const {
    state: { data: clientData },
  } = useClient()

  const initUsers = useMemo(
    () =>
      clientData?.contacts?.filter(
        (item) =>
          !list?.users?.find((listUser) => listUser.address === item.address)
      ),
    [clientData?.contacts, list]
  )

  const addUserHandler = (user: UserData) => {
    if (addContactHandler) {
      addContactHandler([user])
    }
    if (list) {
      const updatedList = { ...list, users: [...list.users, user] }
      updateList(updatedList)
    }
  }

  return (
    <Popover
      triggerElement={
        <Button
          className={classNames(className, s.contacts)}
          variant="outlined"
        >
          + Add contact
        </Button>
      }
      popupContent={
        <AddUserView
          className={s.popup}
          handler={addUserHandler}
          users={initUsers}
        />
      }
    />
  )
}

const s = css`
  .popup {
    overflow: auto;
    min-width: 375px;
    padding: 18px 20px;
    padding-bottom: 0;
    max-height: 350px;
    background: var(--white);
  }
`

export default PopoverAddContact
