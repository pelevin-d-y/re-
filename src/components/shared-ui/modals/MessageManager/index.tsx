/* eslint-disable camelcase */
import React, { useEffect, useReducer } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import EditorActions from 'src/components/shared-ui/EditorActions'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'
import parseMessage from 'src/helpers/utils/parse-message'
import { post } from 'src/api'
import ModalEditorHeader from './EditorHeader'
import ModalHtmlEditor from './HtmlEditor'
import ModalSent from '../ModalSent'

type Props = {
  className?: string
  data: any
  closeHandler: () => void
}

type Action =
  | { type: 'updateBody'; payload: SendMessageData }
  | { type: 'updateSendingStatus' }
  | { type: 'updateRequestStatus'; payload: boolean }

type State = {
  bodyData: SendMessageData
  error: string
  isSending: boolean
  isSent: boolean
}

const initialState = {
  bodyData: {
    from_contact: '',
    body: '',
    to_contact_list: [],
    cc_contact_list: [],
    bcc_contact_list: [],
    reply_to_contact_list: [],
  },
  error: '',
  isSending: false,
  isSent: false,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'updateBody':
      return {
        ...state,
        bodyData: {
          ...state.bodyData,
          ...action.payload,
        },
      }
    case 'updateSendingStatus':
      return {
        ...state,
        isSending: !state.isSending,
      }
    case 'updateRequestStatus':
      return {
        ...state,
        isSent: action.payload,
      }
    default:
      return initialState
  }
}

const MessageManager: React.FC<Props> = ({ className, data, closeHandler }) => {
  const template = data.templateData?.Message
  const [state, dispatch] = useReducer(reducer, initialState)

  const { state: clientState } = useClient()

  const clientName = clientState?.shortName || clientState?.fullName
  const contactName = data.fullName || data.name
  const addressTo = data?.address || data.emails[0]

  useEffect(() => {
    let parsedMessage

    if (template && clientName && contactName) {
      parsedMessage = parseMessage(
        template,
        contactName.split(' ')[0],
        clientName
      )
    }
    setValue('body', parsedMessage)
  }, [contactName, template, clientState, clientName])

  useEffect(() => {
    const syncedEmail =
      clientState?.syncedEmails && clientState?.syncedEmails.length > 0
        ? clientState?.syncedEmails[0]
        : undefined

    dispatch({
      type: 'updateBody',
      payload: {
        from_contact: syncedEmail,
        subject:
          data?.templateData &&
          parseMessage(data.templateData.Subject, contactName),
        to_contact_list: addressTo
          ? [
              {
                address: addressTo || '',
                name: contactName || '',
              },
            ]
          : [],
      },
    })
  }, [addressTo, contactName, data.templateData, clientState?.syncedEmails])

  const sendEmail = async () => {
    dispatch({ type: 'updateSendingStatus' })

    post
      .sendMessage(state.bodyData)
      .then((resp) => {
        dispatch({ type: 'updateSendingStatus' })
        if (resp.status === 200) {
          dispatch({ type: 'updateRequestStatus', payload: true })
        }
      })
      .catch((err) => {
        dispatch({ type: 'updateSendingStatus' })
        // eslint-disable-next-line no-alert
        alert(err)
      })
  }

  const setValue = (field: SendMessageField, value: any) => {
    dispatch({
      type: 'updateBody',
      payload: {
        [field]: value,
      },
    })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      {state.isSent ? (
        <ModalSent names={contactName} handler={closeHandler} />
      ) : (
        <>
          {data && (
            <ModalEditorHeader data={state.bodyData} setValue={setValue} />
          )}
          <ModalHtmlEditor
            className={s.editor}
            value={state.bodyData.body}
            setEditorValue={setValue}
          />
          <div className={s.buttons}>
            {data && <EditorActions className={s.editorActions} />}
            <Button variant="outlined" className={s.buttonTemplate}>
              Save Template
            </Button>
            <Button
              variant="contained"
              className={classNames(
                s.buttonSend,
                state.isSending && s.disabled
              )}
              handler={() => sendEmail()}
            >
              {state.isSending ? (
                <SvgIcon className={s.spinner} icon="spinner.svg" />
              ) : (
                'Send'
              )}
            </Button>
          </div>
        </>
      )}
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 0 0 23px;

    border: 1px solid #f1f1f1;
    border-top: none;
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
      flex-flow: column nowrap;
    }
  }

  .buttonTemplate {
    margin-right: 10px;
    max-width: 140px;
    width: 100%;

    @include mobile {
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 10px;
    }
  }

  .buttonSend {
    position: relative;
    max-width: 140px;
    width: 100%;

    color: var(--white);

    &:hover {
      color: var(-blue);
    }

    @include mobile {
      margin-right: auto;
      margin-left: auto;
    }
  }

  .spinner {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .disabled {
    pointer-events: none;
  }
`

export default MessageManager
