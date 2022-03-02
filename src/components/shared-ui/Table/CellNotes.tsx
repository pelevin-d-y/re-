import React from 'react'
import { css } from 'astroturf'
import TextareaAutosize from 'react-textarea-autosize'
import classNames from 'classnames'

type Props = {
  className?: string
  value: string
  onSave: (val: string) => any
  onChange: React.Dispatch<any>
  minRows?: number
  maxRows?: number
}

const CellNotes: React.FC<Props> = ({
  value,
  className,
  onSave,
  onChange,
  minRows,
  maxRows,
  ...restProps
}) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const target = e.target as HTMLElement
      target.blur()
    }
  }

  return (
    <div
      className={classNames(className, s.container)}
      onClick={(e) => e.stopPropagation()}
      aria-hidden="true"
    >
      <TextareaAutosize
        className={s.textarea}
        placeholder="Include a note for this contact..."
        value={value || ''}
        onBlur={(e) => onSave(e.target.value)}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        minRows={minRows ?? 1}
        maxRows={maxRows ?? 1}
        {...restProps}
      />
    </div>
  )
}

const s = css`
  .container {
  }

  .textarea {
    max-width: 100%;
    width: 100%;
    padding: 9px;
    background: var(--neutral5);
    border: 1px solid var(--neutral4);
    border-radius: 6px;
    font-size: 11px;
    line-height: 13px;
    outline: none;
    color: var(--neutral1);
  }
`

export default CellNotes
