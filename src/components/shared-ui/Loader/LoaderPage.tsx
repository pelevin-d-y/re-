import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
}

const LoaderPage: React.FC<Props> = ({ className }) => (
  <SvgIcon className={classNames(className, s.container)} icon="spinner.svg" />
)

const s = css`
  .container {
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    color: var(--blue);
  }
`

export default LoaderPage
