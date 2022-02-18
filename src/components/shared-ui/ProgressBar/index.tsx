import React from 'react'
import { css } from 'astroturf'
import classnames from 'classnames'

type Props = {
  className?: string
  percentage: number
}

const ProgressBar: React.FC<Props> = ({ className, percentage }) => {
  return (
    <div className={classnames(className, s.progressBar)}>
      <div className={s.currentProgress} style={{ width: `${percentage}%` }} />
    </div>
  )
}

const s = css`
  .progressBar {
    height: 6px;
    width: 100%;
    background: #e4e4e4;
    border-radius: 6px;
  }

  .currentProgress {
    height: 6px;
    background: var(--green);
    border-radius: 6px;

    transition: width 0.3s ease-in-out;
  }
`

export default ProgressBar
