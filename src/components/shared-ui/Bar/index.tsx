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
    .fillBar {
      background: var(--primary1);
    }
  }

  .green {
    .fillBar {
      background: var(--success1);
    }
  }

  .red {
    .fillBar {
      background: var(--red);
    }
  }

  .--primary2 {
    .fillBar {
      background: #00d1ff;
    }
  }

  .orange {
    .fillBar {
      background: var(--secondary1);
    }
  }
`

export default Bar
