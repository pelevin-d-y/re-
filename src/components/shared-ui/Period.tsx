import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  from?: number
  to: number
}

const Period: React.FC<Props> = ({ className, from, to }) => (
  <div className={classNames(className, s.container)}>
    <span className={s.from}>{from ? from : 0}</span> of <span className={s.to}>{to}</span>
  </div>
)

const s = css`
  .container {
    font-weight: var(--bold);
    font-size: 12px;
  }

  .from {
    margin-right: 2px;
    font-size: 32px;
  }
`

export default Period
