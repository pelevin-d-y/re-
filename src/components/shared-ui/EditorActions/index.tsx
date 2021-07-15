import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import PopoverTemplates from 'src/components/shared-ui/popover/PopoverTemplates'
import ModalEditorToolbar from 'src/components/shared-ui/modals/ModalEditorToolbar'

type Props = {
  className?: string
}

const EditorActions: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <PopoverTemplates />
    <ModalEditorToolbar />
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
  }

  .button {
    background: none;
    border: none;
    color: #737373;
    cursor: pointer;
  }

  .icon {
    width: 24px;
    height: 24px;
  }
`

export default EditorActions
