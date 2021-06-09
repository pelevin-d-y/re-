import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import format from 'date-fns/format'

type Props = {
  className?: string
  lastContactTime?: string
  lastContactText?: string
}

const ModalLastMessage: React.FC<Props> = ({
  className,
  lastContactTime,
  lastContactText,
}) => (
  <div className={classNames(s.container, className)}>
    <div className={s.header}>
      <div className={s.headerText}>Last Message:</div>
      {lastContactTime && (
        <div className={s.date}>
          {format(new Date(lastContactTime), 'MMMM dd, yyyy')}
        </div>
      )}
    </div>
    <div className={s.content}>{lastContactText}</div>
  </div>
)

const s = css`
  .container {
    width: 100%;

    border: 1px solid #dddddd;
    border-radius: 4px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    padding: 9px 14px;

    border-bottom: 1px solid #dddddd;
    font-size: 11px;
    font-weight: var(--medium);
  }

  .date {
    margin-left: 5px;
  }

  .content {
    padding: 11px 14px;
    overflow: auto;
    max-height: 117px;

    font-size: 11px;
    line-height: 12px;
  }
`

export default ModalLastMessage
