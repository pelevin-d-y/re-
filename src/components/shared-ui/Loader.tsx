import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
}

const Loader: React.FC<Props> = ({ className }) => (
  <SvgIcon className={classNames(s.container, className)} icon="spinner.svg" />
)

const s = css`
  .container {
    position: absolute;
    top: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
`

export default Loader
