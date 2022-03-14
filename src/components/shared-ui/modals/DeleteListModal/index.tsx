import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import ModalBase from 'src/components/shared-ui/modals/ModalBase'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { LoaderAbsolute } from '../../Loader'
import Button from '../../Button'

type Props = {
  className?: string
}

const DeleteListModal: React.FC<Props> = ({ className }) => {
  const { state: popupState, dispatch: popupDispatch } = usePopup()
  const { deletePlaylists } = usePlaylists()

  const [loading, setLoading] = useState(false)

  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_DELETE_LIST_POPUP' })
  }

  const deleteHandler = async () => {
    try {
      setLoading(true)

      await deletePlaylists([popupState?.listId])
      setLoading(false)
      closeHandler()
    } catch (err) {
      setLoading(false)
      console.log('err => deletePlaylist', err)
    }
  }

  return (
    <ModalBase
      styles={{
        maxWidth: '254px',
        width: '100%',
        minHeight: 'auto',
      }}
      isOpen={popupState.deleteListModalIsOpen}
    >
      <CardContainer className={classNames(className, s.popup)}>
        <div className={s.title}>
          <div className={s.titleText}>Delete list?</div>
        </div>
        <div className={s.actions}>
          <Button
            className={s.button}
            handler={deleteHandler}
            variant="outlined"
          >
            Yes
          </Button>
          <Button
            className={s.button}
            handler={closeHandler}
            variant="outlined"
          >
            Cancel
          </Button>
        </div>
        {loading && <LoaderAbsolute />}
      </CardContainer>
    </ModalBase>
  )
}

const s = css`
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .titleText {
    font-weight: var(--bold);
    font-size: 16px;
    line-height: 19px;
  }

  .popup {
    padding: 15px 12px 15px 22px;
    margin-top: 5px;
    background: var(--shades2);
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

export default DeleteListModal
