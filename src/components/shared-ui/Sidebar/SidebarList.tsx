import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
}

const SidebarList: React.FC<Props> = ({ className }) => (
  <div className={classNames(className)}>
    <div className={s.title}>Connect</div>
    <ul className={s.list}>
      <li className={s.item}>
        <SvgIcon
          className={s.icon}
          icon={require('public/svg/compass.svg?include')}
        />{' '}
        Home
      </li>
      <li className={s.item}>
        <SvgIcon
          className={s.icon}
          icon={require('public/svg/lists.svg?include')}
        />{' '}
        List
      </li>
      <li className={s.item}>
        <SvgIcon
          className={s.icon}
          icon={require('public/svg/contacts.svg?include')}
        />{' '}
        Contacts
      </li>
      <li className={s.item}>
        <SvgIcon
          className={s.icon}
          icon={require('public/svg/templates.svg?include')}
        />{' '}
        Templates
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
