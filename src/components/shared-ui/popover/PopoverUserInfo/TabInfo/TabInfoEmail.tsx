import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import EmailPopover from './EmailPopover'

type Props = {
  className?: string
  emails: string[]
}

type ExtendedEmail = {
  email: string
  id: number
  status: string
}

const TabInfoEmail: React.FC<Props> = ({ className, emails }) => {
  const extendedEmails = emails.map((item, index) => ({
    email: item,
    id: index,
    status: index === 0 ? 'Primary' : 'Set Primary',
  }))

  const [primaryEmail, setPrimaryEmail] = useState(extendedEmails[0])

  const setEmail = (email: ExtendedEmail) => {
    setPrimaryEmail(email)
  }

  return (
    <div className={classNames(className, s.container)}>
      <EmailPopover data={extendedEmails} setEmail={setEmail} />
      <div>{primaryEmail.email}</div>
    </div>
  )
}

const s = css`
  .container {
  }
`

export default TabInfoEmail
