import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import parseEmailMessage from 'src/helpers/utils/parse-message'
import SvgIcon from './SvgIcon'

type Props = {
  className?: string
  text: string
}

const UserHeader: React.FC<Props> = ({ className, text }) => (
  <div className={classNames(className, s.container)}>
    <SvgIcon
      className={s.icon}
      icon={require('public/svg/user-header-logo.svg?include')}
    />
    {text}
  </div>
)

const s = css`
  .container {
    position: relative;

    width: 100%;
    padding: 10px 10px 10px 16px;

    background: var(--lightBlue);
    border-radius: 6px;
  }

  .icon {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 18px;
    height: 19px;
  }
`

export default UserHeader
