import React from 'react'
import { css } from 'astroturf'
import Link from 'next/link'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import classNames from 'classnames'

type Props = {
  className?: string
}

const Logo: React.FC<Props> = ({ className }) => (
  <Link href="/">
    <a className={classNames(className, s.link)}>
      <SvgIcon icon={require('public/svg/logo.svg?include')} />
    </a>
  </Link>
)

Logo.defaultProps = {
  className: undefined,
}

const s = css`
  .link {
    display: block;
    width: 100%;
    height: 50px;
  }
`

export default Logo
