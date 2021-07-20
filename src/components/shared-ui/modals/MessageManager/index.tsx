/* eslint-disable camelcase */
import React, { useEffect, useReducer, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import EditorActions from 'src/components/shared-ui/EditorActions'
import { useClient } from 'src/components/context/ClientContext'
import parseMessage from 'src/helpers/utils/parse-message'
import { useAuth } from 'src/components/context/AuthContext'
import { sendMessage } from 'src/api'
import ModalEditorHeader from './EditorHeader'
import ModalHtmlEditor from './HtmlEditor'

type Props = {
  className?: string
  data: UserData
}

type Action = { type: 'updateData'; payload: SendMessageData }

const initialState = {
  from_address: '',
  body: '',
  to_contact_list: [],
  cc_contact_list: [],
  bcc_contact_list: [],
  reply_to_contact_list: [],
}

const reducer = (state: SendMessageData, action: Action) => {
  switch (action.type) {
    case 'updateData':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return initialState
  }
}

const MessageManager: React.FC<Props> = ({ className, data }) => {
  const template = data.templateData?.Message

  const [state, dispatch] = useReducer(reducer, initialState)

  const { state: clientState } = useClient()
  const { state: authState } = useAuth()

  useEffect(() => {
    let parsedMessage
    if (template && clientState?.name && data.name) {
      parsedMessage = parseMessage(
        template,
        data.name.split(' ')[0],
        clientState.name
      )
    }

    setValue('body', parsedMessage)
  }, [data.name, clientState?.name, template])

  useEffect(() => {
    dispatch({
      type: 'updateData',
      payload: {
        client_id: authState?.idToken,
        from_address: clientState?.address,
        subject:
          data?.templateData &&
          parseMessage(data.templateData.Subject, data.name),
        to_contact_list: [
          {
            address: data.address || '',
            name: data.name || '',
          },
        ],
      },
    })
  }, [
    authState?.idToken,
    clientState?.address,
    data.address,
    data.name,
    data.templateData,
  ])

  const sendEmail = async () => {
    const resp = await sendMessage(state)
    console.log('🚀 ~ file: index.tsx ~ line 91 ~ sendEmail ~ resp', resp)
  }

  const setValue = (field: SendMessageField, value: any) => {
    dispatch({
      type: 'updateData',
      payload: {
        [field]: value,
      },
    })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      {data && <ModalEditorHeader data={state} setValue={setValue} />}
      <ModalHtmlEditor
        className={s.editor}
        value={state.body}
        setEditorValue={setValue}
      />
      <div className={s.buttons}>
        {data && <EditorActions className={s.editorActions} />}
        <Button variant="outlined" className={s.buttonTemplate}>
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
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    margin-top: 22px;
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
      display: flex;
      flex-flow: row nowrap;
    }
  }

  .buttonTemplate {
    margin-right: 10px;
    max-width: 144px;
    width: 100%;
  }

  .buttonSend {
    max-width: 140px;
    width: 100%;
  }
`

export default MessageManager
