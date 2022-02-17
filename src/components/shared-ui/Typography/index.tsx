import React, { FC } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type tagsVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'
  | 'p'
  | 'span'

type styleVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5'

type Props = {
  className?: string
  tagVariant?: tagsVariants
  styleVariant?: styleVariants
  fontWeight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'black'
}

const Typography: FC<Props> = ({
  className,
  tagVariant,
  styleVariant,
  children,
  fontWeight,
  ...props
}) => {
  const Component: any = tagVariant || 'p'

  return (
    <Component
      className={classNames(
        s.container,
        styleVariant && s[styleVariant],
        fontWeight && s[fontWeight],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

const s = css`
  .container {
  }

  .h1 {
    font-size: 42px;
    line-height: 52px;
  }

  .h2 {
    font-size: 32px;
    line-height: 39px;
  }

  .h3 {
    font-size: 24px;
    line-height: 30px;
  }

  .h4 {
    font-size: 18px;
    line-height: 22px;
  }

  .body1 {
    font-size: 16px;
    line-height: 19px;
  }

  .body2 {
    font-size: 14px;
    line-height: 17px;
  }

  .body3 {
    font-size: 12px;
    line-height: 14px;
  }

  .body4 {
    font-size: 11px;
    line-height: 13px;
  }

  .body5 {
    font-size: 9px;
    line-height: 11px;
  }

  .regular {
    font-weight: var(--regular);
  }
  .medium {
    font-weight: var(--medium);
  }
  .semiBold {
    font-weight: var(--semiBold);
  }
  .bold {
    font-weight: var(--bold);
  }
  .black {
    font-weight: var(--black);
  }
`

export default Typography
