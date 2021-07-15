import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import GoogleAuth from 'src/components/shared-ui/GoogleAuth'
import Profile from './PersonalizationProfile'
import PersonalizationSection from './PersonalizationSection'
import Accounts from './PersonalizationAccounts'
import Subscription from './Subscription'

type Props = {
  className?: string
}

const PersonalizationContent: React.FC<Props> = ({ className }) => {
  const { state: clientState } = useClient()

  return (
    <div className={classNames(className, s.container)}>
      {clientState ? (
        <>
          <PersonalizationSection className={s.section} title="Profile">
            <Profile data={clientState} />
          </PersonalizationSection>
          <PersonalizationSection className={s.section} title="Accounts">
            <Accounts data={clientState} />
          </PersonalizationSection>
          <PersonalizationSection className={s.section} title="Subscription">
            <Subscription />
          </PersonalizationSection>
        </>
      ) : null}
      <GoogleAuth className={s.googleAuth} />
    </div>
  )
}

const s = css`
  .container {
    padding: 10px 14px 14px;
  }

  .section {
    margin-bottom: 11px;
  }

  .googleAuth {
    width: 200px;
    height: 50px;
    margin-bottom: 20px;
  }
`

export default PersonalizationContent
