import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Action from './Action'

type Props = {
  className?: string
}

export type ActionVariantType = 'followup' | 'memes' | 'articles' | 'holidays'

export type ActionType = {
  variant: ActionVariantType
  quantity: number
  percent: number
}

const actions: ActionType[] = [
  {
    variant: 'followup',
    quantity: 5,
    percent: 70,
  },
  {
    variant: 'memes',
    quantity: 2,
    percent: 30,
  },
  {
    variant: 'articles',
    quantity: 7,
    percent: 80,
  },
  {
    variant: 'holidays',
    quantity: 1,
    percent: 20,
  },
]

const QuickActions: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <div className={s.title}>Boost your network score</div>
    <div className={s.actions}>
      {actions.map((item) => (
        <Action className={s.action} data={item} key={item.variant} />
      ))}
    </div>
  </div>
)

const s = css`
  .title {
    margin-bottom: 19px;

    font-weight: var(--semibold);
    color: #c5c5c5;
  }

  .actions {
    overflow: auto;

    display: flex;
    flex-flow: row nowrap;
    margin-left: -9px;
    padding-bottom: 5px;
  }

  .action {
    margin-left: 9px;
  }
`

export default QuickActions
