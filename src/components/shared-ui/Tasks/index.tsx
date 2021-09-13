import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  data?: {
    urgent?: number
    pinned?: number
  }
}

const Tasks: React.FC<Props> = ({ className, data }) =>
  data ? (
    <div className={classNames(className, s.container)}>
      {data.urgent && (
        <div className={classNames(s.row, s.urgent)}>
          <div className={s.circle} />
          <div className={s.text}>{data.urgent} Urgent Tasks</div>
        </div>
      )}
      {data.pinned && (
        <div className={classNames(s.row, s.pinned)}>
          <div className={s.circle} />
          <div className={s.text}>{data.pinned} Pinned Tasks</div>
        </div>
      )}
    </div>
  ) : null

const s = css`
  .container {
    font-size: 11px;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .urgent {
    color: var(--red);
  }

  .pinned {
    color: var(--blue);
  }

  .circle {
    width: 10px;
    height: 10px;

    border-radius: 50%;
    margin-right: 9px;
  }
  .urgent .circle {
    background: var(--red);
  }

  .pinned .circle {
    background: var(--blue);
  }
`

export default Tasks
