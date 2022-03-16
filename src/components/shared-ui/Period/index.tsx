import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Typography from '../Typography'

type Props = {
  className?: string
  from?: number
  to: number
}

const Period: React.FC<Props> = ({ className, from, to }) => (
  <div className={classNames(className, s.container)}>
    <Typography
      className={s.from}
      fontVariant="inter"
      fontWeight="bold"
      styleVariant="body1"
    >{`${from || 0} of ${to}`}</Typography>
  </div>
)

const s = css``

export default Period
