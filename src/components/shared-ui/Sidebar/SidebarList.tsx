import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import {
  faCompass,
  faUserFriends,
  faAddressBook,
  faClipboardList,
  faScroll,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  className?: string
}

const SidebarList: React.FC<Props> = ({ className }) => (
  <div className={classNames(className)}>
    <div className={s.title}>Connect</div>
    <ul className={s.list}>
      <li className={s.item}>
        <FontAwesomeIcon className={s.icon} icon={faCompass} /> Home
      </li>
      <li className={s.item}>
        <FontAwesomeIcon className={s.icon} icon={faUserFriends} /> List
      </li>
      <li className={s.item}>
        <FontAwesomeIcon className={s.icon} icon={faClipboardList} />{' '}
        Recommendations
      </li>
      <li className={s.item}>
        <FontAwesomeIcon className={s.icon} icon={faAddressBook} /> Contacts
      </li>
      <li className={s.item}>
        <FontAwesomeIcon className={s.icon} icon={faScroll} /> Templates
      </li>
    </ul>
  </div>
)

SidebarList.defaultProps = {
  className: undefined,
}

const s = css`
  .list {
    padding: 0;
    list-style: none;
  }

  .title {
    padding-left: 34px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .item {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 12px 5px 12px 73px;

    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: var(--lightBlue);
      color: var(--blue);
      border-right: 1px solid var(--blue);
    }
  }

  .icon {
    position: absolute;
    left: 34px;
    top: 12px;
  }
`

export default SidebarList
