/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
  handler: (isChecked: boolean) => void
}

const Checkbox: React.FC<Props> = ({ className, handler }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(evt.target.checked)
    handler(evt.target.checked)
  }

  return (
    <label className={classNames(className, s.container)}>
      <input
        className={s.input}
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <SvgIcon className={s.icon} icon="check.svg" />
    </label>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
  }
  .input {
    display: none;
  }
  .input:checked ~ .icon {
    opacity: 1;
  }
  .input ~ .icon {
    opacity: 0;
  }
  .icon {
    width: 90%;
    transition: all 0.2s linear;
    color: var(--blue);
  }
`

export default Checkbox
