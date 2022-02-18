import React from 'react'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { css } from 'astroturf'
import classNames from 'classnames'

type Props = {
  className?: string
  icon?: string
}

const DropdownIndicator: React.FC<Props> = ({ className, icon }) => (
  <SvgIcon
    className={classNames(s.container, className)}
    icon={icon || 'arrow-selector.svg'}
  />
)

const s = css`
  .container {
    width: 11px;
    height: 11px;
  }
`

export default DropdownIndicator
