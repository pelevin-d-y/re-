import React, { MouseEvent } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  handler: (e: MouseEvent) => void
}

const ModalClose: React.FC<Props> = ({ className, handler }) => (
  <button
    type="button"
    onClick={handler}
    className={classNames(className, s.close)}
  >
    <SvgIcon className={s.closeIcon} icon="close.svg" />
  </button>
)

const s = css`
  .close {
    width: 36px;
    height: 36px;
    cursor: pointer;
    background: #f1f1f1;
    border: none;
  }
  .closeIcon {
    width: 9px;
    height: 9px;
  }
`

export default ModalClose
