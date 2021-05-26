import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  type: string
  placeholder: string
}

const Input: React.FC<Props> = ({ className, type, placeholder }) => (
  <div className={classNames(className, s.container)}>
    <input type={type} placeholder={placeholder} />
  </div>
)

const s = css`
  .container {
  }
`

export default Input
