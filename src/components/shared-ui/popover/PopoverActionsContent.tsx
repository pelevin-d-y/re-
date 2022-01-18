import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

type Props = {
  className?: string
}

const items = [
  {
    name: 'Say Hi',
    handler: () => null,
  },
  {
    name: 'Send Meme',
    handler: () => null,
  },
  {
    name: 'Plan a dinner',
    handler: () => null,
  },
]

const PopoverActionsContent: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(s.container, className)}>
    <ul className={s.list}>
      {items?.map((item) => (
        <li className={s.item} key={item.name}>
          <button
            type="button"
            onClick={() => item.handler()}
            className={s.popupButton}
          >
            {item.name}
          </button>
        </li>
      ))}
      <li className={s.item}>
        <button
          type="button"
          onClick={() => null}
          className={classNames(s.popupButton, s.ignore)}
        >
          Ignore
        </button>
      </li>
    </ul>
  </CardContainer>
)

const s = css`
  .list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .item {
    padding: 0 15px;

    &:last-child {
      .popupButton {
        border-bottom: none;
      }
    }
  }

  .popupButton {
    width: 100%;
    padding-top: 9px;
    padding-bottom: 9px;

    font-size: 12px;
    font-weight: var(--bold);
    text-align: left;
    background: var(--white);
    color: var(--blue);
    border: none;
    border-bottom: 1px solid var(--neutral5);
    cursor: pointer;
  }

  .ignore {
    color: var(-black);
  }
`

export default PopoverActionsContent
