import React from 'react'
import { css } from 'astroturf'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Avatar from 'src/components/shared-ui/Avatar'
import GoogleEmail from 'src/components/shared-ui/GoogleEmail'
import { useClient } from 'src/components/context/ClientContext'
import classNames from 'classnames'
import { logInLink } from 'src/helpers/variables'

type Props = {
  className?: string
}

const HeaderProfile: React.FC<Props> = ({ className }) => {
  const { state } = useClient()
  const addresses = state.data?.authData
    ? Object.entries(state.data.authData).map(([key, value]) => ({
        email: key,
        status: value as number,
      }))
    : []

  return (
    <Popover
      position="bottom right"
      triggerElement={
        <div className={classNames(s.container, className)}>
          <a href={logInLink}>
            <Avatar image={state.data?.avatar} />
          </a>
        </div>
      }
      popupContent={
        <CardContainer className={s.popup}>
          <div className={s.title}>Email Sync</div>
          {addresses &&
            addresses.map(
              (address) =>
                state?.data?.authUrls && (
                  <GoogleEmail
                    key={address.email}
                    className={s.account}
                    data={address}
                    authUrl={state.data.authUrls[address.email]}
                  />
                )
            )}
          {state?.data?.authUrls && state.data?.authUrls[''] && (
            <a className={s.addButton} type="button">
              + Add another email
            </a>
          )}
        </CardContainer>
      }
    />
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
  }

  .email {
    font-size: 12px;
    margin-right: 18px;
  }

  .popup {
    width: 330px;
    padding: 19px 18px 31px 23px;
  }

  .title {
    padding-left: 30px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .account {
    margin-bottom: 7px;
  }

  .addButton {
    width: 100%;
    margin-top: 17px;
    padding-top: 16px;
    padding-bottom: 16px;
    cursor: pointer;

    text-decoration: none;
    background: var(--white);
    color: var(--blue);
    text-align: center;
    font-weight: var(--bold);
    border: 1px dashed var(--blue);
    border-radius: 6px;
  }
`

export default HeaderProfile
