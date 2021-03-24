import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props {
  children: React.ReactNode
  className?: string
}

const CardContainer: React.FC<Props> = ({ className, children }: Props) => (
  <div className={classNames(styles.container, className)}>{children}</div>
)

CardContainer.defaultProps = {
  className: undefined,
}

const styles = css`
  .container {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: -1px 4px 8px 0px rgba(34, 60, 80, 0.2);
  }
`

export default CardContainer
