import React, { useState } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import CloseModal from '../ModalClose'
import ModalMoreInfo from '../ModalMoreInfo'
import HtmlEditorModal from '../ModalHtmlEditor'
import ModalUserInfo from '../ModalUserInfo'
import ModalEditorHeader from '../ModalEditorHeader'
import ModalBase from '../ModalBase'
import ModalSent from '../ModalSent'

const EmailModal: React.FC = () => {
  const { dispatch, state } = usePopup()

  const { data, emailModalIsOpen } = state
  const { name, event, avatar, templateData } = data

  const [isSent, setIsSent] = useState(false)

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_EMAIL_POPUP' })
    setIsSent(false)
    dispatch({ type: 'UPDATE_POPUP_DATA', payload: {} })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={emailModalIsOpen}
      onClose={closeHandler}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.content}>
        {templateData?.Summary && name && (
          <ModalUserInfo
            className={s.header}
            name={name}
            avatar={avatar}
            text={templateData.Summary}
          />
        )}
        {!isSent ? (
          <CardContainer className={s.textContainer}>
            {templateData?.Header && (
              <ModalEditorHeader text={templateData.Header} name={name} />
            )}
            <HtmlEditorModal className={s.editor} name={name} event={event} />
            <div className={s.buttons}>
              <Button variant="outlined" className={s.buttonDots}>
                •••
              </Button>
              <Button
                variant="contained"
                className={s.buttonSend}
                handler={() => setIsSent(true)}
              >
                Send
              </Button>
            </div>
          </CardContainer>
        ) : (
          name && <ModalSent names={name} />
        )}
      </div>
      {!isSent ? <ModalMoreInfo name={name} /> : null}
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 900px;
  }

  .textContainer {
    overflow: hidden;
    margin-top: 22px;
    padding: 0 0 23px;

    border: 1px solid #f1f1f1;
    border-top: none;
  }

  .header {
    padding-right: 46px;
  }

  .content {
    padding: 29px 30px;
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
  }

  .buttons {
    padding-left: 23px;
    padding-right: 25px;
    text-align: right;
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
