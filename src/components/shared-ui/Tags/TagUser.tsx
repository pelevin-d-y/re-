/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import EasyEdit from 'react-easy-edit'

type Props = {
  className?: string
  text: string
}

const TagUser: React.FC<Props> = ({ className, text }) => {
  const onSave = (val: string) => null

  return (
    <div
      className={classNames(className, s.container)}
      onClick={(e) => e.stopPropagation()}
    >
      <EasyEdit
        type="text"
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

export default TagUser
