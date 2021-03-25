import classNames from 'classnames'
import { css } from 'astroturf'

interface Props {
  className?: string
  size?: 'small' | 'medium' | 'large' | undefined
  variant: 'outlined' | 'contained'
}

const Button: React.FC<Props> = ({ className, children, size, variant }) => (
  <button
    className={classNames(s.button, size && s[size], s[variant], className)}
    type="button"
  >
    {children}
  </button>
)

Button.defaultProps = {
  size: undefined,
  variant: 'contained',
}

const s = css`
  .button {
    display: inline-block;
    padding: 7px 11px;
    height: 32px;

    font-size: 14px;
    font-weight: var(--semibold);
    border: 1px solid var(--blue);
    border-radius: 16px;

    transition: all 0.3s linear;
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

export default Button
