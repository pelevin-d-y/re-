/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'

import { css } from 'astroturf'

type Props = {
  className?: string
}

const ModalEditorToolbar: React.FC<Props> = ({ className }) => (
  <div id="editorToolbar" className={className}>
    <button type="button" className="ql-bold" />
    <button type="button" className="ql-italic" />
  </div>
)

const s = css`
  .container {
  }
`

export default ModalEditorToolbar
