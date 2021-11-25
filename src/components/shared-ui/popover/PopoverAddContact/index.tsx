import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import AddUserView from 'src/components/shared-ui/AddUserView'
import Popover from '../PopoverBase'

type Props = {
  className?: string
  listId: string
}

const PopoverAddContact: React.FC<Props> = ({ className, listId }) => (
  <Popover
    triggerElement={
      <Button className={classNames(className, s.contacts)} variant="outlined">
        + Add contact
      </Button>
    }
    popupContent={<AddUserView className={s.popup} listId={listId} />}
  />
)

const s = css`
  .popup {
    min-width: 375px;
    padding: 18px 20px;
    padding-bottom: 0;
    max-height: 350px;
    background: var(--white);
  }
`

export default PopoverAddContact
