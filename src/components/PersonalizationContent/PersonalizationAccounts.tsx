import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import GoogleEmail from 'src/components/shared-ui/GoogleEmail'
import GoogleAuth from 'src/components/shared-ui/GoogleAuth'
import { get } from 'src/api'
import Socials from './Socials'

type Props = {
  className?: string
  data: MainUserData
}

const Accounts: React.FC<Props> = ({ className, data }) => {
  const [authUrls, setAuthUrls] = useState<null | Record<string, string>>(null)

  const addresses = useMemo(
    () =>
      data?.authData
        ? Object.entries(data.authData).map(([key, value]) => ({
            email: key,
            status: value as number,
          }))
        : [],
    [data.authData]
  )

  useEffect(() => {
    if (addresses) {
      const getAuthUrlAsync = async () => {
        get
          .getAuthUrl(addresses.map((item) => item.email))
          .then((res) => {
            setAuthUrls(res)
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.error('getAuthUrlAsync ==>', err))
      }
      getAuthUrlAsync()
    }
  }, [addresses])

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <span className={s.subtitle}>
          Email Sync ({data?.syncedEmails?.length})
        </span>
        {authUrls && (
          <a href={Object.values(authUrls)[0]} className={s.headerAdd}>
            + Add account
          </a>
        )}
      </div>
      <div className={s.syncAccounts}>
        {addresses && authUrls ? (
          addresses?.map((address) => (
            <GoogleEmail
              key={address.email}
              className={s.account}
              data={address}
              authUrl={authUrls[address.email]}
            />
          ))
        ) : (
          <div className={s.emptyAccounts}>
            Strata’s recommendation analyze your network and put together
            recommendations of people to reach out.
          </div>
        )}
      </div>
      {authUrls && Object.values(authUrls)[0] && (
        <GoogleAuth
          className={s.googleAuth}
          authUrl={Object.values(authUrls)[0]}
        />
      )}
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
    text-decoration: none;
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
