import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

interface Props {
  className?: string
  items?: { name: string; handler: () => void }[]
}

const PopoverContent: React.FC<Props> = ({ className, items, children }) => (
  <CardContainer className={classNames(className, s.popup)}>
    {children}
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
    </ul>
  </CardContainer>
)

const s = css`
  .popup {
    padding: 6px 0;
    background: var(--white);
  }

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
    border: none;
    border-bottom: 1px solid var(--lightGrey);
    cursor: pointer;
  }
`

export default PopoverContent
