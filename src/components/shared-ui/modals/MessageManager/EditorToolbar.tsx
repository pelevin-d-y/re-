/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import classNames from 'classnames'

import { css } from 'astroturf'

type Props = {
  className?: string
}

const ModalEditorToolbar: React.FC<Props> = ({ className }) => (
  <div id="editorToolbar" className={classNames(s.container, className)}>
    <select className={classNames('ql-size', s.size)} defaultValue="13px">
      <option value="32px">Heading 1</option>
      <option value="24px">Heading 2</option>
      <option value="13px">medium</option>
      <option value="9px">small</option>
    </select>
    <button type="button" className="ql-bold" />
    <button type="button" className="ql-italic" />
    <button type="button" className="ql-image" />
    <button type="button" className="ql-link" />
    <button type="button" value="ordered" className="ql-list" />
    <button type="button" value="bullet" className="ql-list" />
  </div>
)

const s = css`
  .size {
    text-align: left;
  }
`

export default ModalEditorToolbar
