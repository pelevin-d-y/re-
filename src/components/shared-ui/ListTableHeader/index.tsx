import React from 'react'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import { css } from 'astroturf'
import PopoverAddContact from 'src/components/shared-ui/popover/PopoverAddContact'
import { useTable } from 'src/components/context/TableContext'
import { usePopup } from 'src/components/context/PopupContext'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import AddUserView from 'src/components/shared-ui/AddUserView'

type Props = {
  className?: string
  list: FormattedListData
}

const TableHeader: React.FC<Props> = ({ className, list }) => {
  const { state: selectedUsers } = useTable()
  const { removeUsers, getPlaylistData } = usePlaylist()
  const { dispatch: popupDispatch } = usePopup()

  const removeUsersHandler = async () => {
    if (selectedUsers) {
      await removeUsers(list.id, selectedUsers)
      await getPlaylistData(list.id)
    }
  }

  const contactHandler = () => {
    if (list.contacts) {
      // popupDispatch({ type: 'UPDATE_POPUP_DATA_MULTI', payload: list.contacts })
      // popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
    }
  }

  return (
    <div className={classNames(className, s.container)}>
      <AddUserView listId={list.id} />
      {/* <Search
        classes={{ container: s.search }}
        inputPlaceholder="Search contacts…"
      /> */}
      <div className={s.actions}>
        <Button className={classNames(s.dots, s.button)} variant="outlined">
          •••
        </Button>
        <PopoverAddContact
          className={classNames(s.contacts, s.button)}
          listId={list.id}
        />
        <Button
          className={classNames(s.button, s.remove)}
          handler={removeUsersHandler}
          variant="outlined"
        >
          Remove
        </Button>
        <Button
          className={classNames(s.button, s.filter)}
          variant="outlined"
          isArrow
        >
          Filter
        </Button>
        <Button
          handler={contactHandler}
          className={classNames(s.contact, s.button)}
          variant="contained"
        >
          Contact
        </Button>
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 21px 23px 23px 20px;

    @include mobile {
      padding: 16px 12px;

      flex-flow: column nowrap;
      align-items: flex-start;
    }
  }

  .actions {
    display: flex;
    flex-flow: row nowrap;
    flex: 1 0 auto;

    @include mobile {
      width: 100%;
      flex-flow: row wrap;
      margin-top: 14px;
    }
  }

  .search {
    max-width: 291px;
    width: 100%;
  }

  .contacts {
    max-width: 136px;
    width: 100%;
    margin-left: 14px;

    @include mobile {
      margin-left: 3px;
    }
  }

  .button {
    margin-left: 8px;
    @include mobile {
      margin-top: 6px;
    }
  }

  .dots {
    margin-left: auto;
    max-width: 61px;
    width: 100%;

    @include mobile {
      margin-left: 0;
    }
  }

  .contact,
  .remove,
  .filter {
    max-width: 97px;
    width: 100%;

    @include mobile {
      margin-left: 3px;
    }
  }
`

export default TableHeader
