import React from 'react'
import { css } from 'astroturf'
import Link from 'next/link'
import { faAws } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

interface Props {
  className: string | undefined
}

const Logo = ({ className }: Props): JSX.Element => (
  <Link href="/">
    <a className={classNames(className, styles.link)}>
      <FontAwesomeIcon icon={faAws} style={{ width: '100%', height: '50px' }} />
    </a>
  </Link>
)

const styles = css`
  .link {
    display: block;
    width: 100%;
    height: 50px;
    color: black;
  }
`

export default Logo
