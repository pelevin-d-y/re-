import React from 'react'
import { css } from 'astroturf'
import Link from 'next/link'
import LogoIcon from 'public/svg/logo.svg'
import classNames from 'classnames'

interface Props {
  className?: string
}

const Logo: React.FC<Props> = ({ className }) => (
  <Link href="/">
    <a className={classNames(className, styles.link)}>
      <LogoIcon />
    </a>
  </Link>
)

Logo.defaultProps = {
  className: undefined,
}

const styles = css`
  .link {
    display: block;
    width: 100%;
    height: 50px;
  }
`

export default Logo
