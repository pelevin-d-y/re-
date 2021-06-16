import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
}

const Pin: React.FC<Props> = ({ className }) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setIsActive(!isActive)}
      className={classNames(className, s.button)}
    >
      <SvgIcon
        icon={require('public/svg/pin.svg?include')}
        className={classNames(s.icon, isActive && s.active)}
      />
    </button>
  )
}

const s = css`
  .icon {
    width: 17px;
    height: 17px;

    color: #bfbfbf;
  }

  .icon.active {
    color: var(--blue);
  }

  .button {
    padding: 7px;

    line-height: 0;
    background: var(--white);
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    cursor: pointer;
    background: var(--white);

    &:hover {
      .icon {
        color: var(--blue);
      }
    }
  }
`

export default Pin
