import React from 'react'
import { css } from 'astroturf'
import EasyEdit from 'react-easy-edit'

type Props = {
  className?: string
  type: string
  classPrefix: string
  value: string
  onSave: (...args: any) => any
}

const EditField: React.FC<Props> = ({
  type,
  classPrefix,
  value,
  onSave,
  ...restProps
}) => (
  <EasyEdit
    type={type}
    value={value}
    hideCancelButton
    hideSaveButton
    saveOnBlur
    cssClassPrefix={classPrefix}
    onSave={(val: string) => onSave(val, 'name')}
    {...restProps}
  />
)

const s = css`
  .container {
  }
`

export default EditField
