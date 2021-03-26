import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props {
  children: React.ReactNode
  className?: string
}

const CardContainer: React.FC<Props> = ({ className, children }: Props) => (
  <div className={classNames(s.container, className)}>{children}</div>
)

CardContainer.defaultProps = {
  className: undefined,
}

const s = css`
  .container {
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
  }
`

export default CardContainer
