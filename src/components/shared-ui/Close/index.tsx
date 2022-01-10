import React, { ButtonHTMLAttributes, MouseEvent } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  handler: (e: MouseEvent) => void
}

const CloseButton: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, handler }, ref) => {
    const buttonHandler = (evt: React.MouseEvent<HTMLElement>) => {
      evt.stopPropagation()
      handler(evt)
    }

    return (
      <button
        type="button"
        ref={ref}
        onClick={buttonHandler}
        className={classNames(className, s.close)}
      >
        <SvgIcon className={s.closeIcon} icon="close.svg" />
      </button>
    )
  }
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

export default CloseButton
