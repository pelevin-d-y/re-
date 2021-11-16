import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
}

const LoaderComponent: React.FC<Props> = ({ className }) => (
  <>
    <SvgIcon
      className={classNames(s.container, className)}
      icon="spinner.svg"
    />
    <div className={s.overlay} />
  </>
)

const s = css`
  .container {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    color: var(--blue);
  }

  .overlay {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--white);
    opacity: 0.4;
  }
`

export default LoaderComponent
