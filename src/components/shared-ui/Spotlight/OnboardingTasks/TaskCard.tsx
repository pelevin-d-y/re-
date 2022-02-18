import React from 'react'
import { css } from 'astroturf'
import SvgIcon from '../../SvgIcon'

type TaskCardProps = {
  title: string
  icon: string
  handler: () => void
}

const TaskCard: React.FC<TaskCardProps> = ({ title, icon, handler }) => (
  <div className={s.task}>
    <div className={s.taskIcon}>
      <SvgIcon icon={`${icon}.svg`} />
    </div>
    <button type="button" onClick={handler} className={s.taskTitle}>
      {title}
    </button>
  </div>
)

const s = css`
  .task {
    margin-right: 12px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 1px 1px rgba(34, 34, 34, 0.0989128);
    border-radius: 6px;
    max-width: 88px;
    min-width: 88px;
    min-height: 88px;
    padding: 11px;
  }

  .taskIcon {
    width: 27px;
    height: 27px;
    margin-bottom: 8px;
  }

  .taskTitle {
    cursor: pointer;
    background: transparent;
    border: none;
    outlined: none;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: var(--black);
  }
`

export default TaskCard
