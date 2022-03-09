import React from 'react'
import { css } from 'astroturf'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Avatar from 'src/components/shared-ui/Avatar'
import GoogleEmail from 'src/components/shared-ui/GoogleEmail'
import { useClient } from 'src/components/context/ClientContext'
import classNames from 'classnames'
import { logInLink } from 'src/helpers/variables'
import { useRouter } from 'next/router'
import { getName } from 'src/helpers/utils/get-name'
import Button from '../Button'

type Props = {
  className?: string
}

const HeaderProfile: React.FC<Props> = ({ className }) => {
  const { state } = useClient()
  const router = useRouter()

  const addresses = state.data?.authData
    ? Object.entries(state.data.authData).map(([key, value]) => ({
        email: key,
        status: value as number,
      }))
    : []

  const openPersonalizationPage = () => {
    localStorage.setItem('menuOpen', 'true')
    router.push(`/personalization`)
  }

  return (
    <Popover
      position="bottom right"
      triggerElement={
        <div className={classNames(s.container, className)}>
          <a>
            {state.data && (
              <Avatar image={state.data?.avatar} name={getName(state.data)} />
            )}
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
            <Button
              className={s.addButton}
              type="button"
              handler={openPersonalizationPage}
              variant="outlined"
            >
              + Add another email
            </Button>
          )}
          <a href={logInLink} className={s.logoutButton} type="button">
            Logout
          </a>
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
    cursor: pointer;
    // drop-shadow: none;
    text-decoration: none;
    background: var(--shades2);
    color: var(--primary1);
    text-align: center;
    font-weight: var(--bold);
    border: 1px dashed var(--primary1);
    border-radius: 6px;
  }

  .logoutButton {
    width: 100%;
    margin-top: 17px;
    padding-top: 16px;
    padding-bottom: 16px;
    cursor: pointer;
    // drop-shadow: none;
    text-decoration: none;
    background: var(--shades2);
    color: var(--primary1);
    text-align: center;
    font-weight: var(--bold);
    border-radius: 6px;
    border: 0px;
  }
`

export default HeaderProfile
