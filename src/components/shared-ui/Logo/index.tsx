import React from 'react'
import { css } from 'astroturf'
import Link from 'next/link'
import classNames from 'classnames'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
  isOpen: boolean
}

const Logo: React.FC<Props> = ({ className, isOpen }) => (
  <Link href="/">
    <a className={classNames(s.link, className, !isOpen && s.default)}>
      <SvgIcon className={classNames(s.first, s.icon)} icon="logo-icon.svg" />
      <SvgIcon className={classNames(s.second, s.icon)} icon="logo-text.svg" />
    </a>
  </Link>
)

const s = css`
  .link {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
  }

  .first {
    width: 27px;
    height: 27px;
    margin-right: 6px;
    transition: transform 0.2s ease-in;
    transform: translateX(0);
  }

  .second {
    width: 59px;
    height: 16px;
  }

  .default {
    .first {
      transform: translateX(-26px);
    }
  }
`

export default Logo
