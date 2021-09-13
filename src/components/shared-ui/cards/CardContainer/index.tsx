import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  children: React.ReactNode
  className?: string
}

type Ref = any

const CardContainer = forwardRef<Ref, Props>(({ className, children }, ref) => (
  <div ref={ref} className={classNames(s.container, className)}>
    {children}
  </div>
))

CardContainer.defaultProps = {
  className: undefined,
}

const s = css`
  .container {
    background: var(--white);
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
  }
`

export default CardContainer
