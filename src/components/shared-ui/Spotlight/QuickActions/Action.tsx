import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Bar from 'src/components/shared-ui/Bar'
import { ActionVariantType, ActionType } from '.'

type Props = {
  className?: string
  data: ActionType
}

const getColor = (
  variant: ActionVariantType
): 'blue' | 'orange' | 'green' | '--primary2' => {
  if (variant === 'followup') return 'blue'
  if (variant === 'memes') return 'orange'
  if (variant === 'articles') return 'green'
  if (variant === 'holidays') return '--primary2'
  return 'blue'
}

const Action: React.FC<Props> = ({ className, data }) => {
  const { variant, quantity, percent } = data
  const color = getColor(variant)

  const shareClass = {
    [s.digit]: true,
    [s[color]]: true,
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.text}>
        {variant === 'followup' ? (
          <div>
            <span className={classNames(s.digit, s.blue)}>{quantity}</span> more
            Followups
          </div>
        ) : (
          <div>
            Share <span className={classNames(shareClass)}>{quantity}</span>{' '}
            {variant}
          </div>
        )}
      </div>
      <Bar bar={percent} barColor={color} className={s.bar} />
    </div>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    min-width: 111px;
    padding: 18px 10px 23px;
    background: var(--shades2);

    border-radius: 100px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
  }

  .text {
    text-align: center;
    font-size: 14px;
    line-height: 17px;
    font-weight: var(--bold);
  }

  .bar {
    max-width: 55px;
    margin-top: 8px;
  }

  .blue {
    color: var(--blue);
  }

  .orange {
    color: var(--ginger);
  }

  .green {
    color: var(--success2);
  }

  .--primary2 {
    color: #00d1ff;
  }
`

export default Action
