import React from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/helpers/context/PopupContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import { useUsers } from 'src/helpers/context/UsersContext'
import Avatar from 'src/components/shared-ui/Avatar'
import ModalMoreInfo from '../ModalMoreInfo'
import HtmlEditorModal from '../ModalHtmlEditor'
import ModalUserInfo from '../ModalUserInfo'
import ModalEditorHeader from '../ModalEditorHeader'
import ModalBase from '../ModalBase'

const MultiEmailsModal: React.FC = () => {
  const { toggleMultiEmailsPopup, state } = usePopup()
  const { state: users } = useUsers()
  console.log("🚀 ~ file: index.tsx ~ line 16 ~ state", users)
  const { data, multiEmailsIsOpen } = state

  return (
    <ModalBase
      className={s.container}
      isOpen={multiEmailsIsOpen}
      onClose={toggleMultiEmailsPopup}
    >
      <div className={s.sidebar}>
        <div>search</div>
        <div className={s.selected}>
          <div className={s.selectedHeader}>
            <div className={s.sidebarTitle}>Sending to:</div>
            <div className={s.selectedQuantity}>4 Selected</div>
          </div>
          <div className={s.selectedUser}>user</div>
          <div className={s.selectedUser}>user</div>
          <div className={s.selectedActions}>
            <Button variant="outlined">•••</Button>
            <Button variant="contained">Send to all</Button>
          </div>
        </div>
        <div className={s.users}>
          <div className={s.sidebarTitle}>Contacts to send to</div>
        </div>
        {users?.data.map((item) => (
          <div key={item.name}>
            <Avatar image={item.image} />
            <div className={s.userName}>{item.name}</div>
          </div>
        ))}
      </div>
      <div className={s.content}>
        <ModalUserInfo className={s.header} />
        <CardContainer className={s.textContainer}>
          <ModalEditorHeader name={data.name} />
          <HtmlEditorModal className={s.editor} name={data.name} />
          <div className={s.buttons}>
            <Button variant="contained" size="medium" className={s.buttonSend}>
              Send
            </Button>
          </div>
        </CardContainer>
        <ModalMoreInfo />
      </div>
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 1055px;
    display: grid;
    grid-template-columns: 2fr 4fr;
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
    margin-right: 11px;
  }
`

export default MultiEmailsModal
