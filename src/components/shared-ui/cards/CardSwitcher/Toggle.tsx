import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  handler: () => void
}

const Toggle: React.FC<Props> = ({ className, handler }) => (
  <button
    type="button"
    className={classNames(s.container, className)}
    onClick={handler}
  >
    <SvgIcon icon="arrow-left.svg" className={s.icon} />
  </button>
)

const s = css`
  .container {
    background: none;
    border: none;
    color: var(--blue);
    padding: 0;
    cursor: pointer;
  }
`

export default Toggle
