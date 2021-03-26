import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import StarIcon from 'public/svg/star.svg'

interface Props {
  className?: string
}

const Star: React.FC<Props> = ({ className }) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <StarIcon
      className={classNames(s.icon, isActive && s.active, className)}
      onClick={() => setIsActive(!isActive)}
    />
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
`

export default Star
