import React from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import ModalBase from '../ModalBase'
import ModalContent from '../ModalContent'

const ComposeModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { data, emailModalIsOpen } = state

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: null })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={emailModalIsOpen}
      onClose={closeHandler}
    >
      {/* <CloseModal handler={closeHandler} className={s.close} /> */}
      {data && (
        <ModalContent data={data} withAvatar closeHandler={closeHandler} />
      )}
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    max-width: 900px;
  }

  .footer {
    margin-top: 29px;
  }

  .close {
    position: absolute;
    right: 23px;
    top: 23px;
  }
`

export default ComposeModal
