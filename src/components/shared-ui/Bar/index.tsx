import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  bar: number
  className?: string
}

const Bar: React.FC<Props> = ({ bar, className }) => (
  <>
    <div className={classNames(s.bar, className)}>
      <div className={s.fillBar} style={{ width: `${bar}%` }} />
    </div>
    <div className={s.barText}>Make 1 more to meet weekly goal</div>
  </>
)

const s = css`
  .bar {
    position: relative;
    width: 100%;
    height: 5px;
    margin-top: 10px;

    background: #efefef;
  }

  .fillBar {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    background: var(--yellow);
  }

  .barText {
    color: #808080;
    font-size: 12px;
    line-height: 31px;
  }
`

export default Bar
