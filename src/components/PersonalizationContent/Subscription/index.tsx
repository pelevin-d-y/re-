import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
}

const PersonalizationSubscription: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <div className={s.grid}></div>
  </div>
)

const s = css`
  .container {
  }
`

export default PersonalizationSubscription
