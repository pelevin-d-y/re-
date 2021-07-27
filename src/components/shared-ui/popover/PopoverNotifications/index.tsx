import React from 'react'
import classNames from 'classnames'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Avatar from 'src/components/shared-ui/Avatar'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
}

const PopoverNotifications: React.FC<Props> = ({ className }) => {
  const { state } = useClient()

  const notificationsItems = [
    {
      title: 'Email change',
      description: 'Confirm Landon’s email change',
      user: state?.contacts ? state.contacts[0] : null,
      old: 'landon@companyx.com',
      new: 'landon@venturex.com',
    },
    {
      title: 'Name change',
      description: 'Confirm Landon’s name',
      user: state?.contacts ? state.contacts[1] : null,
      old: 'Landon Tucker',
      new: 'Landon Moses Tucker',
    },
    {
      title: 'Title change',
      description: 'Confirm Landon’s title change',
      user: state?.contacts ? state.contacts[2] : null,
      old: 'Investor @ Company X',
      new: 'Director @ Venture Y',
    },
  ]
  return (
    <Popover
      showPopupEvent="click"
      position="bottom right"
      triggerElement={
        <div className={s.notification}>
          <div className={s.notificationCounter}>
            {notificationsItems.length}
          </div>
        </div>
      }
      popupContent={
        <CardContainer className={classNames(className, s.popup)}>
          <div className={s.title}>Notifications</div>
          <ul className={s.list}>
            {notificationsItems?.map(
              (item) =>
                item.user && (
                  <li className={s.item} key={item.title}>
                    <CardContainer className={s.card}>
                      <div className={s.itemTitle}>{item.title}</div>
                      <div className={s.description}>{item.description}</div>
                      <div className={s.contact}>
                        <Avatar
                          image={item.user.avatar}
                          strength={item.user.relationshipStrength}
                        />
                        <div className={s.contactName}>{item.user.name}</div>
                      </div>
                      <div className={s.table}>
                        <div className={s.row}>
                          <div className={classNames(s.columnName, s.old)}>
                            Old
                          </div>
                          <div className={s.columnValue}>{item.old}</div>
                        </div>
                        <div className={s.row}>
                          <div className={classNames(s.columnName, s.new)}>
                            New
                          </div>
                          <div className={s.columnValue}>{item.new}</div>
                        </div>
                      </div>
                      <div className={s.actions}>
                        <button className={s.button} type="button">
                          Accept
                        </button>
                        <button className={s.button} type="button">
                          Decline
                        </button>
                      </div>
                    </CardContainer>
                  </li>
                )
            )}
          </ul>
        </CardContainer>
      }
    />
  )
}

const s = css`
  .notification {
    position: relative;

    display: block;
    width: 28px;
    height: 28px;
    margin-left: 17px;

    background: url('/images/notification.png') no-repeat center/contain;
    cursor: pointer;

    &:hover {
      background: url('/images/notification-active.png') no-repeat
        center/contain;
    }
  }

  .notificationCounter {
    position: absolute;
    bottom: -7px;
    right: -9px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 19px;
    height: 19px;

    font-size: 11px;
    line-height: 11px;
    border-radius: 50%;
    border: 2px solid var(--white);
    color: var(--white);
    background: #ff0000;
    font-weight: bold;
  }

  .popup {
    min-width: 308px !important;
    padding: 19px 15px 29px 18px;
  }

  .title {
    margin-bottom: 14px;

    font-size: 16px;
    line-height: 19px;
    font-weight: var(--bold);
  }

  .item {
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .card {
    display: flex;
    flex-flow: column nowrap;
    padding: 18px 22px;
  }

  .itemTitle {
    margin-bottom: 5px;

    font-size: 12px;
    font-weight: var(--bold);
    line-height: 14px;
  }

  .description {
    font-size: 14px;
    line-height: 16px;
  }

  .contact {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    padding-top: 16px;
    padding-bottom: 11px;
  }

  .contactName {
    margin-left: 12px;
    font-size: 16px;
    font-weight: var(--bold);
  }

  .table {
    margin-bottom: 12px;

    font-size: 11px;
    line-height: 13px;

    border: 1px solid #dddddd;
    border-radius: 4px;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 15px;

    &:first-child {
      border-bottom: 1px solid #dddddd;
    }
  }

  .old {
    color: #b8b8b8;
    font-weight: var(--semibold);
  }

  .new {
    color: var(--blue);
    font-weight: var(--semibold);
  }

  .actions {
    margin-left: auto;
  }

  .button {
    margin-right: 24px;

    cursor: pointer;
    line-height: 14px;
    color: var(--blue);
    font-size: 12px;
    font-weight: var(--semibold);
    background: none;
    border: none;

    &:last-child {
      margin-right: 0;
    }
  }
`

export default PopoverNotifications
