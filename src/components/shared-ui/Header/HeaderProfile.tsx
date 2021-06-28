import React from 'react'
import { css } from 'astroturf'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Avatar from 'src/components/shared-ui/Avatar'
import GoogleEmail from 'src/components/shared-ui/GoogleEmail'
import { useClient } from 'src/components/context/ClientContext'
import classNames from 'classnames'

type Props = {
  className?: string
}

const HeaderProfile: React.FC<Props> = ({ className }) => {
  const {
    state: { data },
  } = useClient()

  return (
    <Popover
      position="bottom right"
      triggerElement={
        <div className={classNames(s.container, className)}>
          {data?.avatar && (
            <a href="https://strata.auth.us-east-1.amazoncognito.com/login?client_id=4i8sdfh90s4gutrec91couh6e5&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://app.strata.cc">
              <Avatar image={require(`public/images/${data.avatar}`)} />
            </a>
          )}
        </div>
      }
      popupContent={
        <CardContainer className={s.popup}>
          <div className={s.title}>Email Sync</div>
          {data?.addresses?.split('; ').map((address) => (
            <GoogleEmail key={address} className={s.account} email={address} />
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
