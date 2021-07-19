import React, { useState } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import EditorActions from 'src/components/shared-ui/EditorActions'
import CloseModal from 'src/components/shared-ui/Close'
import { useAuth } from 'src/components/context/AuthContext'
import { apiPost } from 'src/api'
import ModalHtmlEditor from '../ModalHtmlEditor'
import ModalUserInfo from '../ModalUserInfo'
import ModalEditorHeader from '../ModalEditorHeader'
import ModalBase from '../ModalBase'
import ModalSent from '../ModalSent'

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

  const sendEmail = async () => {
    if (authState?.idToken) {
      const resp = await apiPost('/api/aws2/messages/send', {
        client_id: authState.idToken,
        from_address: 'natpuot1992@gmail.com',
        to_contact_list: [
          {
            address: 'natpuot92@bk.ru',
            name: 'Denis to',
          },
        ],
        subject: 'Test/send API -> Nylas',
        body: 'Authentication via Cognito & Nylas',
      })

      console.log('resp', resp)
    } else {
      alert('please log in')
    }
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
        {!isSent ? (
          <CardContainer className={s.textContainer}>
            {data && <ModalEditorHeader data={data} />}
            <ModalHtmlEditor className={s.editor} data={data} toParse />
            <div className={s.buttons}>
              {data && <EditorActions className={s.editorActions} />}
              <Button variant="outlined" className={s.buttonDots}>
                Save Template
              </Button>
              <Button
                variant="contained"
                className={s.buttonSend}
                handler={() => sendEmail()}
              >
                Send
              </Button>
            </div>
          </CardContainer>
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

  .textContainer {
    margin-top: 22px;
    padding: 0 0 23px;

    border: 1px solid #f1f1f1;
    border-top: none;
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

  .editor {
    width: 100%;
    min-height: 220px;
    margin-top: 18px;
    margin-bottom: 25px;
    padding-left: 23px;
    padding-right: 25px;
    outline: none;
    border: none;
    resize: none;

    @include mobile {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  .editorActions {
    margin-right: auto;
  }

  .buttons {
    display: flex;
    flex-flow: row wrap;

    padding-left: 23px;
    padding-right: 25px;
    text-align: right;

    @include mobile {
      display: flex;
      flex-flow: row nowrap;
    }
  }

  .buttonDots {
    max-width: 140px;
    width: 100%;
    margin-right: 11px;
  }

  .buttonSend {
    max-width: 140px;
    width: 100%;
  }
`

export default EmailModal
