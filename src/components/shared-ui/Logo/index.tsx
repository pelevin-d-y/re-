import React from 'react'
import { css } from 'astroturf'
import Link from 'next/link'
import { faAws } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

interface Props {
  className?: string
}

const Logo: React.FC<Props> = ({ className }) => (
  <Link href="/">
    <a className={classNames(className, styles.link)}>
      <FontAwesomeIcon icon={faAws} style={{ width: '100%', height: '50px' }} />
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
    color: black;
  }
`

export default Logo
