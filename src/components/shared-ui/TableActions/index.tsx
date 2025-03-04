import React from 'react'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import { css } from 'astroturf'
import { useTable } from 'src/components/context/TableContext'
import { usePopup } from 'src/components/context/PopupContext'
import { usePlaylist } from 'src/components/context/PlaylistContext'
// import { usePinned } from 'src/components/context/PinnedContext'

const actions = [
  'createList',
  'contact',
  'dots',
  'removeContacts',
  'filter',
  'addToList',
  'clearPinnedContacts',
] as const

type Buttons = Array<typeof actions[number]>

type Props = {
  className?: string
  data?: ListData
  buttons: Buttons
}

const TableActions: React.FC<Props> = ({ className, data, buttons }) => {
  const { removeUsers, getPlaylistData } = usePlaylist()
  const { state: selectedUsers } = useTable()
  const { dispatch: popupDispatch } = usePopup()
  // const { clearPinned } = usePinned()

  const addToListHandler = () => {
    if (selectedUsers) {
      popupDispatch({
        type: 'UPDATE_COMPOSE_MULTI_DATA',
        payload: selectedUsers,
      })
      popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
    }
  }

  const removeUsersHandler = async () => {
    if (data && 'playlist_id' in data) {
      if (selectedUsers) {
        await removeUsers(data.playlist_id, selectedUsers)
        await getPlaylistData(data.playlist_id)
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("id is undefined or data doesn't contain id field")
    }
  }

  const contactHandler = () => {
    if (selectedUsers && selectedUsers?.length >= 0) {
      popupDispatch({
        type: 'UPDATE_COMPOSE_MULTI_DATA',
        payload: selectedUsers,
      })
      popupDispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
    }
  }

  const toggleCreateListModal = () => {
    popupDispatch({ type: 'TOGGLE_CREATE_LIST_POPUP' })
  }

  const clearPinnedContacts = () => {
    // clearPinned()
  }

  const isSelectedUsersEmpty = !!(selectedUsers && selectedUsers.length <= 0)
  return (
    <div className={classNames(className, s.container)}>
      {buttons.includes('dots') && (
        <Button className={classNames(s.dots, s.button)} variant="outlined">
          •••
        </Button>
      )}
      {buttons.includes('clearPinnedContacts') && (
        <Button
          className={classNames(s.button, s.clearPinned)}
          handler={clearPinnedContacts}
          variant="outlined"
        >
          Clear pinned
        </Button>
      )}
      {buttons.includes('addToList') && (
        <Button
          className={classNames(s.button)}
          handler={addToListHandler}
          disabled={isSelectedUsersEmpty}
          variant="outlined"
        >
          Add to list
        </Button>
      )}
      {buttons.includes('removeContacts') && (
        <Button
          className={classNames(s.button, s.remove)}
          handler={removeUsersHandler}
          disabled={isSelectedUsersEmpty}
          variant="outlined"
        >
          Remove
        </Button>
      )}
      {buttons.includes('createList') && (
        <Button
          className={classNames(s.button, s.buttonCreate)}
          handler={toggleCreateListModal}
          variant="outlined"
        >
          Create List
        </Button>
      )}
      {buttons.includes('filter') && (
        <Button
          className={classNames(s.button, s.filter)}
          variant="outlined"
          isArrow
        >
          Filter
        </Button>
      )}
      {buttons.includes('contact') && (
        <Button
          handler={contactHandler}
          disabled={isSelectedUsersEmpty}
          className={classNames(s.contact, s.button)}
          variant="contained"
        >
          Contact
        </Button>
      )}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
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

    &:first-child {
      margin-left: auto;
    }
  }

  .dots {
    max-width: 61px;
    width: 100%;

    @include mobile {
      margin-left: 0;
    }
  }

  .contact {
    max-width: 110px;
    width: 100%;

    @include mobile {
      margin-left: 3px;
    }
  }

  .remove,
  .filter {
    max-width: 97px;
    width: 100%;

    @include mobile {
      margin-left: 3px;
    }
  }

  .clearPinned {
    color: var(--red);
    background-color: var(--white);
    border: 1px solid var(--red);

    &:hover {
      background-color: var(--red);
      color: var(--white);
    }
  }
`

export default TableActions
