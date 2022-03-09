import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { FieldProps } from 'formik'
import Typography from '../Typography'

type Props = {
  className?: string
  type: string
  label?: string
  placeholder?: string
  [x: string]: any
}

const Input: React.FC<Props & FieldProps> = ({
  className,
  type,
  placeholder,
  field,
  form,
  label,
  ...restProps
}) => {
  const { name, value, onChange } = field
  const { errors } = form
  return (
    <div className={classNames(className, s.container)}>
      {label && (
        <label className={s.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={s.input}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...restProps}
      />
      {errors[field.name] && (
        <Typography
          className={s.error}
          styleVariant="body3"
          fontWeight="medium"
          fontVariant="inter"
        >
          {errors[field.name]}
        </Typography>
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
    border-radius: 4px;
    border: 1px solid #d8d8d8;
  }

  .label {
    display: block;
    margin-bottom: 9px;

    color: #7e7e7e;
    line-height: 18px;
  }

  .error {
    position: absolute;
    bottom: -18px;
    color: var(--primary1);
  }
`

export default Input
