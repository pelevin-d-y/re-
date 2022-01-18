import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  variant?: 'outlined' | 'contained'
  href: string
}

const Link: React.FC<Props> = ({ className, children, variant, href }) => (
  <NextLink href={href}>
    <a
      className={classNames(
        variant ? s.link : '',
        variant ? s[variant] : '',
        className
      )}
    >
      {children}
    </a>
  </NextLink>
)

const s = css`
  .link {
    position: relative;
    display: inline-block;
    padding: 7px 11px;
    height: 32px;

    font-size: 14px;
    font-weight: var(--semiBold);
    border: 1px solid var(--blue);
    border-radius: 16px;
    text-decoration: none;

    transition: all 0.3s linear;
    cursor: pointer;
  }

  .outlined {
    color: var(--blue);
    background: var(--white);

    &:hover {
      color: var(--white);
      background: var(--blue);
    }
  }

  .contained {
    background: var(--blue);
    color: var(--white);

    &:hover {
      background: var(--white);
      color: var(--blue);
    }
  }
`

export default Link
