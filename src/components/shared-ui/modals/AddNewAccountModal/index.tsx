import React, { useMemo } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import Img from 'src/components/shared-ui/Img'
import CloseButton from 'src/components/shared-ui/Close'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'
import classnames from 'classnames'
import ModalBase from '../ModalBase'
import GoogleEmail from '../../GoogleEmail'

const AddAccountModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { addNewAccountModalIsOpen } = state

  const { state: clientState } = useClient()

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_ADD_NEW_ACCOUNT_POPUP' })
  }

  const addresses = useMemo(
    () =>
      clientState.data?.authData
        ? Object.entries(clientState.data.authData).map(([key, value]) => ({
            email: key,
            status: value as number,
          }))
        : [],
    [clientState?.data?.authData]
  )

  const placeholders = useMemo(() => {
    const accounts = addresses ? Object.entries(addresses).length : 0
    const numberOfPlaceholders = 3 - accounts

    return numberOfPlaceholders > 0 ? Array(numberOfPlaceholders).fill(0) : []
  }, [addresses])

  return (
    <ModalBase isOpen={addNewAccountModalIsOpen} styles={{ maxWidth: '600px' }}>
      <CloseButton className={s.closeContainer} handler={closeHandler} />

      <div className={s.header}>
        <div className={s.circle}>
          <SvgIcon className={s.iconGoogle} icon="google-mail.svg" />
          <Img className={s.iconStrata} alt="logo" img="logo-user-info.svg" />
        </div>
        <div>
          <div className={s.title}>Connect another Account</div>
          <div className={s.description}>
            Strata’s engine analyze your network for top recommendations to
            reach out to.
          </div>
        </div>
      </div>

      <div className={s.syncAccounts}>
        {addresses ? (
          addresses?.map(
            (address) =>
              clientState?.data?.authUrls && (
                <GoogleEmail
                  key={address.email}
                  className={classnames(s.cardAccount, s.account)}
                  data={address}
                  authUrl={clientState.data.authUrls[address.email]}
                />
              )
          )
        ) : (
          <div className={s.emptyAccounts}>
            Strata’s recommendation analyze your network and put together
            recommendations of people to reach out.
          </div>
        )}

        {placeholders?.map((payload, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={classnames(s.cardAccount, s.cardEmpty)}>
            <span>+ Add another account</span>
          </div>
        ))}
      </div>

      <div className={s.buttonContainer}>
        {clientState.data?.authUrls && (
          <a href={clientState.data?.authUrls['']} className={s.buttonConnect}>
            + Connect another account
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

  .cardAccount {
    margin: 12px 24px;
    border-radius: 6px;
    // box-shadow: 0px 4px 8px rgb(0 0 0 / 12%), 0px 1px 1px rgb(34 34 34 / 10%);
    border: 1px solid var(--neutral4);
  }

  .cardEmpty {
    background-color: var(--neutral5);
    height: 72px;
    text-align: center;
    color: var(--neutral3);
    font: 14px;
    padding: 29px;
  }
`

export default AddAccountModal
