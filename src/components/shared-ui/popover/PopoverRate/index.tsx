import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

type Props = {
  className?: string
  buttonClickHandler: () => void
  variant: 'outlined' | 'contained'
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
  {
    name: 'Ignore',
    handler: () => null,
  },
]

const PopoverRate: React.FC<Props> = ({
  className,
  buttonClickHandler,
  variant,
  children,
}) => (
  <Popover
    showPopupEvent="hover"
    triggerElement={
      <Button
        className={classNames(className, s.button)}
        variant={variant}
        isArrow
        handler={() => buttonClickHandler()}
      >
        {children}
      </Button>
    }
    popupContent={
      <CardContainer className={classNames(s.popup)}>
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
    }
  />
)

const s = css`
  .popup {
    width: 175px !important;
  }

  .stars {
    margin-top: 6px;
  }

  .rate {
    padding: 9px 15px;
    font-weight: var(--bold);
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
    color: var(--blue);
    border: none;
    border-bottom: 1px solid var(--lightGrey);
    cursor: pointer;
  }
`

export default PopoverRate
