import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import EasyEdit from 'react-easy-edit'

type Props = {
  className?: string
  text: string
}

const Tag: React.FC<Props> = ({ className, text }) => {
  const onSave = (val: string) => {
    console.log('val', val)
  }

  return (
    <div className={classNames(className, s.container)}>
      <EasyEdit
        type="text"
        className={s.valueInput}
        value={text}
        hideCancelButton
        hideSaveButton
        saveOnBlur
        cssClassPrefix="tag-"
        onSave={(val: string) => onSave(val)}
      />
    </div>
  )
}

const s = css`
  .container {
    display: inline-block;
    padding: 5px 8px;

    border: 1px solid #efefef;
    border-radius: 100px;

    font-size: 11px;
    line-height: 13px;
  }
`

export default Tag
