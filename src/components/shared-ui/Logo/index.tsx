import React from 'react'
import { css } from 'astroturf'
import Link from 'next/link'
import classNames from 'classnames'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
}

const Logo: React.FC<Props> = ({ className }) => (
  <Link href="/">
    <a className={classNames(s.link, className)}>
      <SvgIcon
        className={s.icon}
        icon={require('public/svg/logo.svg?include')}
      />
    </a>
  </Link>
)

const s = css`
  .link {
    display: block;
    width: 100%;
  }
`

export default Logo
