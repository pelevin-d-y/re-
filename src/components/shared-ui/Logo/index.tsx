import React from 'react'
import { css } from 'astroturf'
import Link from 'next/link'
import classNames from 'classnames'

type Props = {
  className?: string
}

const Logo: React.FC<Props> = ({ className }) => (
  <Link href="/">
    <a className={classNames(s.link, className)}>
      <img
        className={s.image}
        src={require('public/images/logo.png')}
        alt="logo"
      />
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
