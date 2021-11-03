import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Toggle from './Toggle'

type Props = {
  className?: string
  nextHandler: () => void
  prevHandler: () => void
}

const CardSwitcher: React.FC<Props> = ({
  className,
  nextHandler,
  prevHandler,
}) => (
  <div className={classNames(s.container, className)}>
    <Toggle className={classNames(s.control, s.left)} handler={prevHandler} />
    <Toggle className={classNames(s.control, s.right)} handler={nextHandler} />
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .control {
    width: 17px;
    height: 17px;
  }

  .right {
    transform: rotate(180deg);
    margin-left: 14px;
  }
`

export default CardSwitcher
