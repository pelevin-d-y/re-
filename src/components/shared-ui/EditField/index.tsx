import React from 'react'
import { css } from 'astroturf'
import EasyEdit from 'react-easy-edit'
import classNames from 'classnames'

type Props = {
  className?: string
  classPrefix?: string
  type: string
  value: string
  onSave: (val: string) => any
}

const EditField: React.FC<Props> = ({
  type = 'text',
  classPrefix,
  value,
  className,
  onSave,
  ...restProps
}) => (
  <div
    className={classNames(className, s.container)}
    onClick={(e) => e.stopPropagation()}
    aria-hidden="true"
  >
    <EasyEdit
      type={type}
      value={value || null}
      hideCancelButton
      hideSaveButton
      saveOnBlur
      cssClassPrefix={classPrefix}
      onSave={onSave}
      {...restProps}
    />
  </div>
)

const s = css`
  .container {
  }
`

export default EditField
