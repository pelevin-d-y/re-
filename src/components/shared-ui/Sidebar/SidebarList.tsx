import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Compass from 'public/svg/compass.svg'
import Lists from 'public/svg/lists.svg'
import Community from 'public/svg/community.svg'
import Contacts from 'public/svg/contacts.svg'
import Templates from 'public/svg/templates.svg'

interface Props {
  className?: string
}

const SidebarList: React.FC<Props> = ({ className }) => (
  <div className={classNames(className)}>
    <div className={s.title}>Connect</div>
    <ul className={s.list}>
      <li className={s.item}>
        <Compass className={s.icon} /> Home
      </li>
      <li className={s.item}>
        <Lists className={s.icon} /> List
      </li>
      <li className={s.item}>
        <Community className={s.icon} /> Recommendations
      </li>
      <li className={s.item}>
        <Contacts className={s.icon} /> Contacts
      </li>
      <li className={s.item}>
        <Templates className={s.icon} /> Templates
      </li>
    </ul>
  </div>
)

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

    height: 21px;
    width: 21px;
  }
`

export default SidebarList
