import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  href: string
  children: React.ReactNode
  filled?: true | false
}

const Link = ({ href, children, className, filled }: Props): JSX.Element => (
  <NextLink href={href}>
    <a className={classNames(className, styles.link, filled && styles.filled)}>
      {children}
    </a>
  </NextLink>
)

Link.defaultProps = {
  filled: false,
}

const styles = css`
  .link {
    display: inline-block;
    padding: 10px 20px;

    text-decoration: none;
    text-align: center;
    color: var(--blue);

    border: 1px solid var(--blue);
    background: var(--white);
    border-radius: 18px;
  }

  .link.filled {
    background: var(--blue);
    color: var(--white);
  }
`

export default Link
