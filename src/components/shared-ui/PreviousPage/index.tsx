import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
  text?: string
  handler?: () => void
}

const PreviousPage: React.FC<Props> = ({ className, text, handler }) => {
  const router = useRouter()

  const buttonHandler = () => {
    if (handler) {
      handler()
    } else {
      router.back()
    }
  }

  return (
    <button
      className={classNames(s.button, className)}
      type="button"
      onClick={buttonHandler}
    >
      <SvgIcon icon="back.svg" className={s.icon} /> {text || 'Back'}
    </button>
  )
}

const s = css`
  .button {
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
    width: max-content;
    padding: 0;

    background: none;
    border: none;
    cursor: pointer;
    font-weight: var(--semibold);
  }

  .icon {
    width: 9px;
    height: 9px;
    margin-right: 8px;
  }
`

export default PreviousPage
