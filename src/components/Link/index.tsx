import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import { css } from 'astroturf'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  href: string
  children: React.ReactNode
  typeSize: 'medium' | 'large'
  typeColor: 'light' | 'dark'
}

const Link = ({
  href,
  children,
  typeSize,
  typeColor,
  className,
}: Props): JSX.Element => (
  <NextLink href={href}>
    <a
      className={classNames(
        styles.link,
        styles[typeSize],
        styles[typeColor],
        className
      )}
    >
      {children}
    </a>
  </NextLink>
)

const styles = css`
  .link {
    display: inline-block;
    border: 0.5px solid var(--black);
    text-decoration: none;
    text-align: center;
  }

  .link.large {
    width: 300px;
    padding: 18px 8px;
    text-transform: uppercase;
  }

  .link.light {
    border: 1px solid var(--white);
    color: var(--white);
    background: none;
  }

  .link.dark {
    border: 1px solid var(--black);
    color: var(--white);
    background: var(--black);
  }
`

export default Link
