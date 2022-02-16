import React from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import Img from 'src/components/shared-ui/Img'
import CloseButton from 'src/components/shared-ui/Close'
import Button from 'src/components/shared-ui/Button'
import ModalBase from '../ModalBase'

const AccountAddedModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { accountAddedModalIsOpen } = state

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_ACCOUNT_ADDED_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={accountAddedModalIsOpen}
      onClose={closeHandler}
    >
      <CloseButton className={s.closeContainer} handler={closeHandler} />

      <div className={s.header}>
        <Img className={s.iconStrata} alt="logo" img="logo-user-info.svg" />
        <div>
          <div className={s.title}>You’re all set!</div>
          <div className={s.description}>
            Strata’s engine is analyzing your network for top recommendations to
            reach out to. It should take around <b>XX days</b>.
          </div>
        </div>
      </div>

      <div className={s.buttonContainer}>
        <Button
          className={s.buttonConnect}
          variant="outlined"
          handler={closeHandler}
        >
          Done
        </Button>
      </div>
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    max-width: 600px;
  }

  .closeContainer {
    width: 30px;
    margin-left: calc(100% - 50px);
    margin-top: 15px;
    background: transparent;
    color: var(--neutral2);
  }

  .buttonContainer {
    display: block;
    width: fit-content;
    margin: 0 auto;
  }

  .buttonConnect {
    margin-top: 45px;
    margin-bottom: 30px;
    padding: 7px 64px;
  }

  .header {
    width: 100%;
    margin-top: 48px;
    margin-bottom: 48px;
    padding-left: 64px;
    padding-right: 64px;

    text-align: center;

    @include mobile {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  .title {
    font-size: 24px;
    font-weight: var(--semiBold);
    margin-top: 0.8em;
  }

  .description {
    width: 100%;
    margin-top: 2.6em;
  }

  .iconStrata {
    width: 90px;
    height: 90px;
  }
`

export default AccountAddedModal
