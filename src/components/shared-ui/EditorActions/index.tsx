import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import PopoverTemplates from 'src/components/shared-ui/popover/PopoverTemplates'
import { usePopup } from 'src/components/context/PopupContext'

type Props = {
  className?: string
}

const EditorActions: React.FC<Props> = ({ className }) => {
  const { dispatch } = usePopup()
  const templatesHandler = () => {
    dispatch({ type: 'TOGGLE_TEMPLATES_POPUP' })
  }

  return (
    <div className={classNames(className, s.container)}>
      <PopoverTemplates />
    </div>
  )
}

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
