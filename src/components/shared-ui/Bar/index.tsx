import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  bar: number
  className?: string
  barColor: 'blue' | 'green' | 'red'
}

const Bar: React.FC<Props> = ({ bar, className, barColor }) => (
  <div className={classNames(s.bar, className, s[barColor])}>
    <div className={s.fillBar} style={{ width: `${bar}%` }} />
  </div>
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

  .blue {
    background: #cedeff;

    .fillBar {
      background: var(--blue);
    }
  }

  .green {
    background: #d0ffeb;
    .fillBar {
      background: #32d08e;
    }
  }

  .red {
    background: #ffe9e9;
    .fillBar {
      background: var(--red);
    }
  }
`

export default Bar
