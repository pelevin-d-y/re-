/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
  handler: (isChecked: boolean) => void
  id: string
}

const Checkbox: React.FC<Props> = ({ children, className, handler, id }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(evt.target.checked)
    handler(evt.target.checked)
  }

  return (
    <div className={classNames(className, s.container)}>
      <label className={s.box} htmlFor={id}>
        <input
          className={s.input}
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleChange}
        />
        <SvgIcon className={s.icon} icon="check.svg" />
      </label>
      <label className={s.label} htmlFor={id}>
        {children}
      </label>
    </div>
  )
}

const s = css`
  s.container {
    display: flex;
  }
  .box {
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
    color: var(--primary1);
  }
  .label {
    cursor: pointer;
  }
`

export default Checkbox
