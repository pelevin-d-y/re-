import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { FieldProps } from 'formik'

type Props = {
  className?: string
  type: string
  placeholder: string
}

const Input: React.FC<Props & FieldProps> = ({
  className,
  type,
  placeholder,
  field,
  form,
}) => {
  const { name, onChange } = field
  const { errors } = form
  return (
    <div className={classNames(className, s.container)}>
      <input
        className={s.input}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errors[field.name] && (
        <div className={s.error}>{errors[field.name]}</div>
      )}
    </div>
  )
}

const s = css`
  .container {
    position: relative;
    width: 100%;
  }

  .input {
    display: block;
    width: 100%;
    padding: 16px 21px;

    font-size: 14px;
    line-height: 17px;
    border: 1px solid #d8d8d8;
  }

  .error {
    position: absolute;
    top: 100%;

    font-size: 11px;
    color: var(--red);
  }
`

export default Input
