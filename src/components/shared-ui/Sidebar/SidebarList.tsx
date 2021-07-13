import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Link from 'next/link'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  isOpen: boolean
}

const SidebarList: React.FC<Props> = ({ className, isOpen }) => (
  <div className={classNames(className, s.container, isOpen && s.active)}>
    <ul className={s.list}>
      <li>
        <Link href="/">
          <a className={s.item}>
            <SvgIcon
              className={s.icon}
              icon={require('public/svg/compass.svg?include')}
            />{' '}
            Home
          </a>
        </Link>
      </li>
      <li>
        <Link href="/lists">
          <a className={s.item}>
            <SvgIcon
              className={s.icon}
              icon={require('public/svg/lists.svg?include')}
            />{' '}
            Lists
          </a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a className={s.item}>
            <SvgIcon
              className={s.icon}
              icon={require('public/svg/contacts.svg?include')}
            />{' '}
            Contacts
          </a>
        </Link>
      </li>
      <li>
        <Link href="/personalization">
          <a className={s.item}>
            <SvgIcon
              className={s.icon}
              icon={require('public/svg/templates.svg?include')}
            />{' '}
            Personalization
          </a>
        </Link>
      </li>
    </ul>
  </div>
)

const s = css`
  .list {
    padding: 0;
    list-style: none;
  }

  .item {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 12px 5px 12px 73px;
    color: var(--black);

    font-weight: bold;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background: var(--lightBlue);
      color: var(--blue);
      border-right: 1px solid var(--blue);
    }
  }

  .icon {
    position: absolute;
    left: 16px;
    top: 10px;

    height: 21px;
    width: 21px;
    transition: left 0.2s ease-in;
  }

  .active {
    .icon {
      left: 34px;
    }
  }
`

export default SidebarList
