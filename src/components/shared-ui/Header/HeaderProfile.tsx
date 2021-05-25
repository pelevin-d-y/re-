import React from 'react'
import { css } from 'astroturf'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Avatar from 'src/components/shared-ui/Avatar'
import GoogleEmail from 'src/components/shared-ui/GoogleEmail'
import { useClient } from 'src/components/context/ClientContext'

const HeaderProfile: React.FC = () => {
  const {
    state: { data },
  } = useClient()

  return (
    <Popover
      position="bottom right"
      triggerElement={
        <div className={s.container}>
          <div className={s.email}>{data.address}</div>
          <Avatar image={require(`public/images/${data.avatar}`)} />
        </div>
      }
      popupContent={
        <CardContainer className={s.popup}>
          <div className={s.title}>Email Sync</div>
          {data.addresses?.split('; ').map((address) => (
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
