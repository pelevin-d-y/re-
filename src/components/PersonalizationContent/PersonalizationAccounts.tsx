import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import GoogleEmail from 'src/components/shared-ui/GoogleEmail'

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
      <div className={s.socials}>
        <div className={s.subtitle}>Social Accounts</div>
      </div>
    </div>
  )
}

const s = css`
  .subtitle {
    margin-bottom: 4px;

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
  }

  .socials {
    margin-top: 21px;
  }
`

export default Accounts
