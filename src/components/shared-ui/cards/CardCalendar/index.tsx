import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'

type Props = {
  className?: string
  text?: string | number
  title?: string
}

const CardCalendar: React.FC<Props> = ({ className, text, title }) => (
  <div className={classNames(s.container, className)}>
    <div className={s.top}>{title}</div>
    <div className={s.bottom}>{text}</div>
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    min-width: 45px;
    overflow: hidden;
    background: var(--shades2);
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
  }

  .top {
    padding: 2px 0;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    background: var(--accentRose1);
    color: var(--shades2);
  }

  .bottom {
    padding: 4px;
    line-height: 24px;
    text-align: center;
    font-size: 20px;
    font-weight: var(--bold);
  }
`

export default CardCalendar
