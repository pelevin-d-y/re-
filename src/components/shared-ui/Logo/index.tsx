import React from 'react'
import { css } from 'astroturf'
import Link from 'next/link'
import classNames from 'classnames'
import SvgIcon from '../SvgIcon'
import LogoSvgIcon from './SvgIconLogo'

type Props = {
  className?: string
  isOpen: boolean
}

const Logo: React.FC<Props> = ({ className, isOpen }) => (
  <Link href="/">
    <a className={classNames(s.link, className, !isOpen && s.default)}>
      <LogoSvgIcon className={s.first} /> {/* svg view error in build */}
      <SvgIcon className={s.second} icon="logo-text.svg" />
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
