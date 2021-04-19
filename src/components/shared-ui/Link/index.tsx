import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  size?: 'small' | 'medium' | 'large' | undefined
  variant?: 'outlined' | 'contained'
  href: string
}

const Link: React.FC<Props> = ({
  href,
  className,
  children,
  size,
  variant,
}) => (
  <NextLink href={href}>
    <a
      className={classNames(
        s.link,
        size && s[size],
        variant && s[variant],
        className
      )}
    >
      {children}
    </a>
  </NextLink>
)

Link.defaultProps = {
  size: undefined,
  variant: 'contained',
}

const s = css`
  .link {
    display: inline-block;
    padding: 7px 11px;

    font-size: 14px;
    font-weight: var(--semibold);
    border: 1px solid var(--blue);
    border-radius: 16px;
    text-decoration: none;

    transition: all 0.2s linear;
  }

  .small {
    width: 140px;
  }

  .medium {
    width: 140px;
  }

  .large {
    width: 212px;
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
