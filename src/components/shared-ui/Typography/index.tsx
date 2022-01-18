import React, { FC, FunctionComponent } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type variants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subheading1'
  | 'subheading2'
  | 'body1'
  | 'body2'

type Props = {
  className?: string
  tagVariant?: variants
  styleVariant?: variants
  fontWeight?: 'regular' | 'medium' | 'semiBold' | 'bold'
}

const variantsMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'div',
  h5: 'div',
  h6: 'div',
  subheading1: '',
  subheading2: 'h6',
  body1: 'p',
  body2: 'p',
}

const Typography: FC<Props> = ({
  className,
  tagVariant,
  styleVariant,
  children,
  fontWeight,
  ...props
}) => {
  const Component: any = tagVariant ? variantsMapping[tagVariant] : 'div'

  return (
    <Component
      className={classNames(
        s.container,
        className,
        styleVariant && s[styleVariant],
        fontWeight && s[fontWeight]
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
  }
  .h2 {
  }
  .h3 {
  }
  .h4 {
  }
  .h5 {
  }
  .h6 {
  }
  .subheading1 {
  }
  .subheading2 {
  }
  .body1 {
  }
  .body2 {
  }
  .regular {
  }
  .medium {
  }
  .semiBold {
  }
  .bold {
  }
`

export default Typography
