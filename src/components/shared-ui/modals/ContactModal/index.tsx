import React from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import CloseModal from 'src/components/shared-ui/Close'
import MessageManager from 'src/components/shared-ui/modals/MessageManager'
import ModalUserInfo from '../ModalUserInfo'
import ModalBase from '../ModalBase'

const EmailModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { data, emailModalIsOpen } = state

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: {} })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={emailModalIsOpen}
      onClose={closeHandler}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.content}>
        {data && <ModalUserInfo className={s.header} data={data} />}
        <MessageManager data={data} closeHandler={closeHandler} />
      </div>
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    max-width: 900px;
  }

  .header {
    padding-right: 53px;

    @include mobile {
      margin-bottom: 10px;
    }
  }

  .content {
    padding: 29px 30px;

    @include mobile {
      padding: 29px 16px;
    }
  }

  .close {
    position: absolute;
    right: 23px;
    top: 23px;
  }
`

export default EmailModal
