import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'

type Props = {
  className?: string
  icon: string
}

const SvgIcon: React.FC<Props> = ({ className, icon }) => (
  <div
    className={classNames(className, s.container)}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: icon,
    }}
  />
)

const s = css`
  .container {
    display: inline-block;
  }
`

export default SvgIcon
