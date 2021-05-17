import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { formatDistance } from 'date-fns'

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
      <div className={s.headerText}>Last Message</div>
      {lastContactTime && (
        <div className={s.date}>
          {formatDistance(new Date(), new Date(lastContactTime))}
        </div>
      )}
    </div>
    <div className={s.content}>{lastContactText}</div>
  </div>
)

const s = css`
  .container {
    width: 100%;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 9px;
  }

  .headerText {
    font-size: 12px;
    font-weight: var(--bold);
  }

  .date {
    font-size: 11px;
    line-height: 13px;
    color: #979797;
  }

  .content {
    padding: 13px;
    border: 1px solid #dcdcdc;

    font-size: 11px;
    line-height: 18px;
  }
`

export default ModalLastMessage
