import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  variant: 'outlined' | 'contained'
  isArrow?: boolean
  handler?: () => void
}

const Button: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, children, variant, isArrow, handler, ...props }, ref) => (
    <button
      className={classNames(
        s.button,
        s[variant],
        isArrow && s.arrowButton,
        className
      )}
      type="button"
      ref={ref}
      onClick={handler}
      {...props}
    >
      <span className={s.text}>{children}</span>
      {isArrow && (
        <SvgIcon
          className={s.arrow}
          icon={require('public/svg/inputArrow.svg?include')}
        />
      )}
    </button>
  )
)

Button.defaultProps = {
  variant: 'contained',
}

const s = css`
  .button {
    position: relative;
    display: inline-block;
    padding: 7px 11px;
    height: 32px;

    font-size: 14px;
    font-weight: var(--semibold);
    border: 1px solid var(--blue);
    border-radius: 16px;

    transition: all 0.3s linear;
    cursor: pointer;
  }

  .arrowButton {
    padding-right: 15px;
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

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
`

export default Button
