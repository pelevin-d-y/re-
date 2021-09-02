import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import AddUserView from 'src/components/shared-ui/AddUserView'
import Popover from '../PopoverBase'

type Props = {
  className?: string
  addContactHandler?: (users: UserData[]) => void
}

const PopoverAddContact: React.FC<Props> = ({
  className,
  addContactHandler,
}) => {
  const addUserHandler = (user: UserData) => {
    if (addContactHandler) {
      addContactHandler([user])
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
      popupContent={<AddUserView className={s.popup} />}
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
