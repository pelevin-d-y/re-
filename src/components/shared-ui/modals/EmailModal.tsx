import React from 'react'
import ReactModal from 'react-modal'
import { css } from 'astroturf'
import { usePopup } from 'src/helpers/context/PopupContext'
import Avatar from 'src/components/shared-ui/Avatar'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import Templates from 'public/svg/templates.svg'
import CloseModal from './CloseModal'

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
      <div className={s.header}>
        <div className={s.profile}>
          <Avatar />
          <div className={s.profileInfo}>
            <div className={s.name}>Landon Tucker</div>
            <div className={s.profileType}>
              <ColorfulCircle />
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
          <span className={s.textTitle}>Follow up with Landon for meeting</span>
          <Templates className={s.icon} />
        </div>
        <textarea
          className={s.textarea}
          name="description"
          value="This is a description."
        />
        <Button variant="outlined" className={s.buttonDots}>
          •••
        </Button>
        <Button variant="contained" className={s.buttonDots}>
          Send
        </Button>
      </CardContainer>
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
    padding: 26px 30px;
    background: var(--white);
    overflow: auto;

    inset: 'auto';
  }

  .close {
    position: absolute;
    right: 23px;
    top: 23px;
  }

  .icon {
    width: 26px;
    height: 26px;
  }
`

export default EmailModal
