import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import GoogleEmail from 'src/components/shared-ui/GoogleEmail'
import GoogleAuth from 'src/components/shared-ui/GoogleAuth'
import Socials from './Socials'

type Props = {
  className?: string
  data: UserData
}

const Accounts: React.FC<Props> = ({ className, data }) => {
  const addresses = data?.addresses?.split('; ') || []

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <span className={s.subtitle}>Email Sync ({addresses.length})</span>
        <span className={s.headerAdd}>+ Add account</span>
      </div>
      <div className={s.syncAccounts}>
        {addresses.map((address) => (
          <GoogleEmail key={address} className={s.account} email={address} />
        ))}
      </div>
      <GoogleAuth className={s.googleAuth} />
      <div className={s.socials}>
        <div className={s.subtitle}>Social Accounts</div>
        <Socials />
      </div>
    </div>
  )
}

const s = css`
  .subtitle {
    margin-bottom: 18px;

    font-weight: var(--semibold);
    line-height: 31px;
  }

  .headerAdd {
    margin-left: 15px;

    color: var(--blue);
    line-height: 31px;
    cursor: pointer;
  }

  .syncAccounts {
    display: flex;
    flex-flow: row wrap;
  }

  .account {
    max-width: 256px;
    width: 100%;
    margin-right: 13px;

    &:last-child {
      margin-right: 0;
    }
  }

  .socials {
    margin-top: 21px;
  }

  .googleAuth {
    width: 200px;
    height: 50px;
    margin-top: 18px;
  }
`

export default Accounts
