import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Img from '../Img'
import Typography from '../Typography'

type Props = {
  className?: string
  text: string
}

const NextStep: React.FC<Props> = ({ className, text }) => (
  <Typography
    className={classNames(className, s.container)}
    styleVariant="body4"
  >
    <Img className={s.icon} alt="logo" img="logo-user-info.svg" />
    {text}
  </Typography>
)

const s = css`
  .container {
    position: relative;

    width: 100%;
    padding: 10px 10px 10px 16px;

    background: var(--primary2);
    border-radius: 6px;
  }

  .icon {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 17px;
    height: 18px;
  }
`

export default NextStep
