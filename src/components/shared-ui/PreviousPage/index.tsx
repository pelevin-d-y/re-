import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
  text?: string
}

const PreviousPage: React.FC<Props> = ({ className, text }) => {
  const router = useRouter()
  return (
    <button
      className={classNames(s.button, className)}
      type="button"
      onClick={() => router.back()}
    >
      <SvgIcon
        icon={require('public/svg/back.svg?include')}
        className={s.icon}
      />{' '}
      {text || 'Back'}
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
