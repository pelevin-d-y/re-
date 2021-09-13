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
  const addresses = state?.authData
    ? Object.entries(state.authData).map(([key, value]) => ({
        email: key,
        status: value as number,
      }))
    : []
  return (
    <Popover
      position="bottom right"
      triggerElement={
        <div className={classNames(s.container, className)}>
          {state?.avatar && (
            <a href={logInLink}>
              <Avatar image={state?.avatar} />
            </a>
          )}
        </div>
      }
      popupContent={
        <CardContainer className={s.popup}>
          <div className={s.title}>Email Sync</div>
          {addresses &&
            addresses?.map((address) => (
              <GoogleEmail
                key={address.email}
                className={s.account}
                data={address}
              />
            ))}
          <button className={s.addButton} type="button">
            + Add another email
          </button>
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

    background: var(--white);
    color: var(--blue);
    font-weight: var(--bold);
    border: 1px dashed #1966ff;
    border-radius: 6px;
  }
`

export default HeaderProfile
