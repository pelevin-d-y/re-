import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  data: UserData
}

const ContactTabs: React.FC<Props> = ({ className, data }) => {
  return <div className={classNames(className, s.container)}>b</div>
}

const s = css`
  .container {
    padding: 37px 24px 47px 18px;
  }
`

export default ContactTabs
