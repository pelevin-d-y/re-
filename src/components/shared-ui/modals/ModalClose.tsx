import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Close from 'public/svg/close.svg'

interface Props {
  className?: string
  handler: () => void
}

const ModalClose: React.FC<Props> = ({ className, handler }) => (
  <button
    type="button"
    onClick={handler}
    className={classNames(className, s.close)}
  >
    <Close className={s.closeIcon} />
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
