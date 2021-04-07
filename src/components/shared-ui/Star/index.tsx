import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

interface Props {
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
    cursor: pointer;

    &:hover {
      color: var(--ginger);
    }
  }

  .icon.active {
    color: var(--ginger);
  }

  .button {
    padding: 0;
    border: none;
    background: none;
    outline: none;
  }
`

export default Star
