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
    border: 1px solid var(--primary1);
    border-radius: 16px;
    text-decoration: none;

    transition: all 0.3s linear;
    cursor: pointer;
  }

  .outlined {
    color: var(--primary1);
    background: var(--shades2);

    &:hover {
      color: var(--shades2);
      background: var(--primary1);
    }
  }

  .contained {
    background: var(--primary1);
    color: var(--shades2);

    &:hover {
      background: var(--shades2);
      color: var(--primary1);
    }
  }
`

export default Link
