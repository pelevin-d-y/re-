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
      <SvgIcon icon={require('public/svg/logo.svg?include')} />
    </a>
  </Link>
)

const s = css`
  .link {
    display: block;
    width: 100%;
    height: 50px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default Logo
