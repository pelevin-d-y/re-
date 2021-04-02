import React from 'react'
import ReactModal from 'react-modal'
import { css } from 'astroturf'
import { usePopup } from 'src/helpers/context/PopupContext'
import Avatar from 'src/components/shared-ui/Avatar'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import Templates from 'public/svg/templates.svg'
import CloseModal from './ModalClose'
import ModalMoreInfo from './ModalMoreInfo'

const EmailModal: React.FC = () => {
  const { closePopup, state } = usePopup()
  ReactModal.setAppElement('#__next')
  const modalStyles = {
    overlay: {
      zIndex: 20,
      background: 'rgba(0, 0, 0, 0.5)',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }

  return (
    <ReactModal
      isOpen={state.isOpen}
      onRequestClose={closePopup}
      className={s.container}
      style={modalStyles}
    >
      <CloseModal handler={closePopup} className={s.close} />
      <div className={s.content}>
        <div className={s.header}>
          <div className={s.profile}>
            <Avatar />
            <div className={s.profileInfo}>
              <div className={s.name}>Landon Tucker</div>
              <div className={s.profileType}>
                <ColorfulCircle color="black" />
                Follow up on Meetings
              </div>
            </div>
          </div>
          <div className={s.info}>
            Landon intro-ed <b>Ari Kieth</b> last week, follow up with Landon on
            meeting went with her.
          </div>
        </div>
        <CardContainer className={s.textContainer}>
          <div className={s.textHeader}>
            <span className={s.textTitle}>
              Follow up with Landon for meeting
            </span>
            <Templates className={s.icon} />
          </div>
          <textarea
            className={s.textarea}
            name="description"
            defaultValue="This is a description."
          />
          <div className={s.buttons}>
            <Button variant="outlined" size="medium" className={s.buttonDots}>
              •••
            </Button>
            <Button variant="contained" size="medium" className={s.buttonSend}>
              Send
            </Button>
          </div>
        </CardContainer>
      </div>
      <ModalMoreInfo />
    </ReactModal>
  )
}

const s = css`
  .container {
    position: relative;
    max-width: 900px;
    width: 100%;
    max-height: calc(100vh - 2rem);
    min-height: 500px;
    background: var(--white);
    overflow: auto;

    inset: 'auto';
  }

  .content {
    padding: 29px 30px;
  }

  .close {
    position: absolute;
    right: 23px;
    top: 23px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding-right: 46px;
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
  }

  .profileInfo {
    margin-left: 19px;
  }

  .name {
    margin-bottom: 6px;

    font-weight: var(--bold);
    font-size: 18px;
    line-height: 21px;
  }

  .info {
    max-width: 30%;
    width: 100%;
    padding: 11px 17px 13px;
    font-size: 12px;

    background: #f8f8f8;
  }

  .textContainer {
    margin-top: 22px;
    padding: 9px 0 23px;

    border: 1px solid #f1f1f1;
    border-top: 6px solid var(--red);
  }

  .textHeader {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 9px 23px;

    border-bottom: 1px solid #e0e0e0;
  }

  .icon {
    width: 26px;
    height: 26px;
  }

  .textTitle {
    font-weight: var(--bold);
  }

  .textarea {
    width: 100%;
    min-height: 200px;
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

export default EmailModal
