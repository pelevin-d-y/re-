import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
}

const Star: React.FC<Props> = ({ className }) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setIsActive(!isActive)}
      className={classNames(className, s.button)}
    >
      <SvgIcon
        icon={require('public/svg/star.svg?include')}
        className={classNames(s.icon, isActive && s.active)}
      />
    </button>
  )
}

const s = css`
  .icon {
    width: 16px;
    height: 16px;

    color: var(--grey);
  }

  .icon.active {
    color: var(--ginger);
  }

  .button {
    padding: 7px;
    background: var(--white);
    border: none;
    background: none;
    outline: none;
    cursor: pointer;

    &:hover {
      .icon {
        color: var(--ginger);
      }
    }
  }
`

export default Star
