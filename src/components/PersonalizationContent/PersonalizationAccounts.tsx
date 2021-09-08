import React, { useEffect } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import GoogleEmail from 'src/components/shared-ui/GoogleEmail'
import GoogleAuth from 'src/components/shared-ui/GoogleAuth'
import { getAuth } from 'src/api'

import Socials from './Socials'

type Props = {
  className?: string
  data: MainUserData
}

const Accounts: React.FC<Props> = ({ className, data }) => {
  const addresses = data?.emails

  useEffect(() => {
    const getAuthAsync = () => {
      getAuth().then((res) => console.log('res', res))
    }
    getAuthAsync()
  })

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <span className={s.subtitle}>Email Sync ({addresses?.length})</span>
        <span className={s.headerAdd}>+ Add account</span>
      </div>
      <div className={s.syncAccounts}>
        {addresses && addresses.length > 0 ? (
          addresses?.map((address) => (
            <GoogleEmail key={address} className={s.account} email={address} />
          ))
        ) : (
          <div className={s.emptyAccounts}>
            Strata’s recommendation analyze your network and put together
            recommendations of people to reach out.
          </div>
        )}
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
  @import 'src/styles/preferences/_mixins.scss';

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
    margin-right: 13px;
    margin-bottom: 13px;

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
    margin-top: 5px;
  }

  .emptyAccounts {
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    max-width: 50%;

    @include mobile {
      max-width: 100%;
    }
  }
`

export default Accounts
