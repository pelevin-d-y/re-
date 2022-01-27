import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Close from 'src/components/shared-ui/Close'
import { useClient } from 'src/components/context/ClientContext'
import ThreadItem from './ThreadItem'
import { getName } from 'src/helpers/utils/get-name'

type Props = {
  className?: string
  data?: RecommendationUser
  buttonText: string
}

const PopoverThread: React.FC<Props> = ({ className, data, buttonText }) => {
  const { state } = useClient()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      showPopupEvent="click"
      position="bottom right"
      open={isOpen}
      triggerElement={
        <div>
          <button
            className={s.button}
            onClick={() => setIsOpen(true)}
            type="button"
          >
            {buttonText}
          </button>
        </div>
      }
      popupContent={
        <CardContainer className={classNames(s.popup, className)}>
          <div className={s.header}>
            <div className={s.title}>Thread</div>
            <Close handler={() => setIsOpen(false)} />
          </div>
          <div className={s.main}>
            <ul className={s.list}>
              {data &&
                state &&
                [data].map((item) => (
                  <li className={s.item} key={item.address}>
                    {state.data && (
                      <ThreadItem
                        data={item}
                        clientName={getName(state.data)}
                      />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </CardContainer>
      }
    />
  )
}

const s = css`
  .button {
    align-self: flex-start;

    height: auto;
    padding: 0;

    font-size: 14px;
    line-height: 16px;
    color: var(--blue);
    border: none;
    background: none;
    cursor: pointer;
  }

  .popup {
    width: 450px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 11px 13px 21px;

    border-bottom: 1px solid #f1f1f1;
  }

  .title {
    font-size: 16px;
    line-height: 19px;
    font-weight: var(--bold);
  }

  .main {
    overflow: auto;
    padding: 18px;
  }

  .item {
    margin-bottom: 8px;

    border: 1px solid #f1f1f1;
    border-radius: 4px;
  }
`

export default PopoverThread
