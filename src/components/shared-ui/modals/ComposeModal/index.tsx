import React from 'react'
import { usePopup } from 'src/components/context/PopupContext'
import ModalBase from '../ModalBase'
import ModalContent from '../ModalContent'

const ComposeModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { data, emailModalIsOpen } = state

  const closeHandler = () => {
    if (state.emailModalIsOpen) {
      dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: null })
    }
  }

  return (
    <ModalBase
      isOpen={emailModalIsOpen}
      styles={{ maxWidth: '900px' }}
      onClose={closeHandler}
    >
      {data && (
        <ModalContent data={data} withAvatar closeHandler={closeHandler} />
      )}
    </ModalBase>
  )
}

export default ComposeModal
