import React from 'react'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { css } from 'astroturf'
import classNames from 'classnames'

type Props = {
  className?: string
}

const DropdownIndicator: React.FC<Props> = ({ className }) => (
  <SvgIcon
    className={classNames(s.container, className)}
    icon="arrow-selector.svg"
  />
)

const s = css`
  .container {
    width: 11px;
    height: 11px;
  }
`

export default DropdownIndicator
