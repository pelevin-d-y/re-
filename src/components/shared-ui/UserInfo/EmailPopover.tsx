import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

interface PrimaryEmail extends ContactMutable {
  status: 'Primary' | 'Set Primary'
}

type Props = {
  className?: string
  data: PrimaryEmail[]
  setEmail: (emailData: any) => void
}

const EmailPopover: React.FC<Props> = ({ className, data, setEmail }) => {
  const [isOpen, setIsOpen] = useState(false)

  const setEmailHandler = (emailData: any) => {
    setIsOpen(false)
    setEmail(emailData)
  }

  return (
    <Popover
      open={isOpen}
      showPopupEvent="click"
      nested
      triggerElement={
        <div>
          <div
            className={s.trigger}
            role="button"
            onClick={() => setIsOpen(true)}
            onKeyDown={() => setIsOpen(true)}
            tabIndex={0}
          >
            Email ({data.length}) <span>Primary</span>{' '}
            <SvgIcon className={s.selectArrow} icon="arrow-selector.svg" />
          </div>
        </div>
      }
      popupContent={
        <CardContainer className={classNames(className, s.popup)}>
          <ul className={s.list}>
            {data?.map((item) => (
              <li key={item.data as string}>
                <div
                  className={s.item}
                  role="button"
                  onClick={() => setEmailHandler(item)}
                  onKeyDown={() => setEmailHandler(item)}
                  tabIndex={0}
                >
                  <div className={s.popupEmail}>{item.data}</div>
                  <span
                    className={classNames(
                      s.status,
                      item.status === 'Primary' && s.primary
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContainer>
      }
    />
  )
}

const s = css`
  .popup {
    width: 290px;
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0 15px;

    font-size: 11px;
    cursor: pointer;
    &:last-child {
      .popupButton {
        border-bottom: none;
      }
    }
  }

  .selectArrow {
    width: 9px;
    height: 9px;
    margin-left: 6px;

    color: var(--blue);
  }

  .popupEmail {
    width: 100%;
    padding-top: 9px;
    padding-bottom: 9px;
    font-size: 11px;
    font-weight: var(--semiBold);
    text-align: left;
    background: var(--white);
    border: none;
    border-bottom: 1px solid var(--neutral5);
    cursor: pointer;
  }

  .trigger {
    margin-bottom: 10px;

    cursor: pointer;
    font-size: 12px;
    line-height: 14px;
    color: #adadad;

    span {
      margin-left: 5px;
      color: var(--blue);
    }
  }

  .status {
    flex: 1 0 auto;
    color: #aaaaaa;
  }

  .status.primary {
    color: var(--blue);
  }
`

export default EmailPopover
