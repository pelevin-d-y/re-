import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Link from 'next/link'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useRouter } from 'next/router'

type Props = {
  className?: string
  isOpen: boolean
}

const SidebarList: React.FC<Props> = ({ className, isOpen }) => {
  const router = useRouter()

  return (
    <div className={classNames(className, s.container, isOpen && s.default)}>
      <ul className={s.list}>
        <li className="home-menu-welcome">
          <Link href="/">
            <a className={classNames(s.item, router.route === '/' && s.active)}>
              <SvgIcon className={s.icon} icon="compass.svg" /> Home
            </a>
          </Link>
        </li>
        <li className="lists-menu-welcome">
          <Link href="/lists">
            <a
              className={classNames(
                s.item,
                router.route === '/lists' && s.active
              )}
            >
              <SvgIcon className={s.icon} icon="lists.svg" /> Lists
            </a>
          </Link>
        </li>
        <li className="recommendations-menu-welcome">
          <Link href="/recommendations">
            <a
              className={classNames(
                s.item,
                router.route === '/recommendations' && s.active
              )}
            >
              <SvgIcon className={s.icon} icon="recs.svg" /> Recommendations
            </a>
          </Link>
        </li>

        <li className="personalization-menu-welcome">
          <Link href="/personalization">
            <a
              className={classNames(
                s.item,
                router.route === '/personalization' && s.active
              )}
            >
              <SvgIcon className={s.icon} icon="personlization.svg" />{' '}
              Personalization
            </a>
          </Link>
        </li>

        <li className="pinned-menu-welcome">
          <Link href="/pinned">
            <a
              className={classNames(
                s.item,
                router.route === '/pinned' && s.active
              )}
            >
              <SvgIcon className={s.icon} icon="pin.svg" /> Pinned Contacts
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

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
    color: var(--shades1);

    font-weight: var(--semiBold);
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background: var(--primary2);
      color: var(--primary1);
      border-right: 1px solid var(--primary1);
    }
  }

  .active {
    background: var(--primary2);
    color: var(--primary1);
    border-right: 1px solid var(--primary1);
  }

  .icon {
    position: absolute;
    left: 37px;
    top: 10px;

    height: 21px;
    width: 21px;
    transform: translateX(-25px);
    transition: transform 0.2s ease-in;
  }

  .default {
    .icon {
      transform: translateX(0);
    }
  }
`

export default SidebarList
