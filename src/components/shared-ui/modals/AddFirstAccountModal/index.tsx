import React from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import Img from 'src/components/shared-ui/Img'
import CloseButton from 'src/components/shared-ui/Close'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'
import ModalBase from '../ModalBase'

const AddFirstAccountModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { addFirstAccountModalIsOpen } = state

  const { state: clientState } = useClient()

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_ADD_FIRST_ACCOUNT_POPUP' })
  }

  return (
    <ModalBase
      isOpen={addFirstAccountModalIsOpen}
      styles={{ maxWidth: '600px' }}
    >
      <CloseButton className={s.closeContainer} handler={closeHandler} />

      <div className={s.header}>
        <div className={s.circle}>
          <Img className={s.iconStrata} alt="logo" img="logo-user-info.svg" />
          <SvgIcon className={s.iconGoogle} icon="google-mail.svg" />
        </div>
        <div>
          <div className={s.title}>Connect an Account to get started</div>
          <div className={s.description}>
            Strata’s engine analyze your network for top recommendations to
            reach out to.
          </div>
        </div>
      </div>

      <Img className={s.image} img="connect-account.png" alt="image" />

      <div className={s.buttonContainer}>
        {clientState.data?.authUrls && (
          <a href={clientState.data?.authUrls['']} className={s.buttonConnect}>
            + Connect an account
          </a>
        )}
      </div>
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

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
    text-decoration: none;

    position: relative;
    overflow: hidden;
    display: inline-block;
    padding: 7px 64px;
    height: 32px;

    font-size: 14px;
    font-weight: var(--semiBold);
    border: 1px solid var(--blue);
    border-radius: 16px;

    transition: all 0.3s linear;
    cursor: pointer;

    background: var(--blue);
    color: var(--white);

    &:hover {
      background: var(--white);
      color: var(--blue);
    }
  }

  .image {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;

    @include mobile {
      width: 80%;
      margin-left: 10%;
      margin-right: 10%;
    }
  }

  .header {
    display: flex;
    flex-flow: row nowrap;

    width: 100%;
    margin-bottom: 48px;
    padding-left: 42px;

    @include mobile {
      padding-left: 12px;
    }
  }

  .title {
    font-size: 24px;
    font-weight: var(--semiBold);
  }

  .description {
    max-width: 60%;
    width: 100%;

    margin-top: 0.6em;
    @include mobile {
      max-width: 100%;
    }
  }

  .circle {
    position: relative;

    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 62px;
    width: 100%;
    height: 62px;
    margin-right: 29px;

    border: 1.2px solid #e4e4e4;
    border-radius: 50%;
  }

  .iconGoogle {
    width: 30px;
    height: 30px;
  }

  .iconStrata {
    position: absolute;
    bottom: -2px;
    right: -5px;
    width: 22px;
    height: 22px;
  }
`

export default AddFirstAccountModal
