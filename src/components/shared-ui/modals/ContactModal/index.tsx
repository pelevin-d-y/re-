import React, { useState } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import CloseModal from 'src/components/shared-ui/Close'
import { useAuth } from 'src/components/context/AuthContext'
import ModalUserInfo from '../ModalUserInfo'
import ModalBase from '../ModalBase'
import ModalSent from '../ModalSent'
import MessageManager from '../MessageManager'

const EmailModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { data, emailModalIsOpen } = state
  const [isSent, setIsSent] = useState(false)

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_CONTACT_POPUP', payload: {} })
    setIsSent(false)
  }

  const { state: authState } = useAuth()
  console.log('🚀 ~ file: index.tsx ~ line 27 ~ authState', authState)

  // 'https://7qq5n63vjg.execute-api.us-east-1.amazonaws.com/Test/messages/send' \
  // --header 'Authorization: ???' \
  // --header 'Content-Type: application/json' \
  // --data-raw '{
  //   "client_id": "Client_Strata_ID",
  //   "from_address": "gabriel@strata.cc",
  //   "to_contact_list": [
  //     {
  //       "address": "Gabriel.Archacki.Hare@gmail.com",
  //       "name": "Gabriel to"
  //     }
  //   ],
  //   "cc_contact_list": [
  //     {
  //       "address": "Gabriel.Archacki.Hare@gmail.com",
  //       "name": "Gabriel cc"
  //     }
  //   ],
  //   "bcc_contact_list": [
  //     {
  //       "address": "Gabriel.Archacki.Hare@gmail.com",
  //       "name": "Gabriel bcc"
  //     }
  //   ],
  //   "reply_to_contact_list": [
  //     {
  //       "address": "Gabriel.Archacki.Hare@gmail.com",
  //       "name": "Gabriel reply to"
  //     }
  //   ],
  //   "subject": "Via cURL -> Test/send API -> Nylas",
  //   "body": "Authentication via Cognito & Nylas"

  return (
    <ModalBase
      className={s.container}
      isOpen={emailModalIsOpen}
      onClose={closeHandler}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.content}>
        {data && <ModalUserInfo className={s.header} data={data} />}
        {!isSent ? (
          <MessageManager data={data} />
        ) : (
          data.name && <ModalSent names={data.name} />
        )}
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
    padding-right: 46px;

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
