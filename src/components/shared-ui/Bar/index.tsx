import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  bar: number
  className?: string
  barColor: 'blue' | 'green' | 'red' | '--primary2' | 'orange'
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

    background: #efefef;
  }

  .fillBar {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    background: var(--secondary2);
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
      background: var(--success2);
    }
  }

  .red {
    background: #ffe9e9;
    .fillBar {
      background: var(--red);
    }
  }

  .--primary2 {
    background: #f2f2f2;
    .fillBar {
      background: #00d1ff;
    }
  }

  .orange {
    .fillBar {
      background: var(--ginger);
    }
  }
`

export default Bar
