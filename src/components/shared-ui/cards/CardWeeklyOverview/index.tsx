import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  period: string
  text: string
}

const CardWeeklyOverview: React.FC<Props> = ({
  className,
  period,
  text,
  children,
}) => (
  <div className={classNames(s.container, className)}>
    <div className={s.wrapper}>
      <div className={s.text}>
        <div className={s.subtitle}>{text}</div>
        <div className={s.time}>{period}</div>
      </div>
      {children}
    </div>
  </div>
)

const s = css`
  .container {
    padding: 16px 20px 11px 20px;
    box-shadow: 0px 1px 1px rgba(34, 34, 34, 0.0989128);
  }

  .wrapper {
    align-items: center;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .text {
    line-height: 16px;
    font-size: 12px;
  }

  .subtitle {
    font-weight: var(--semiBold);
    margin-bottom: 5px;
  }
`

export default CardWeeklyOverview
