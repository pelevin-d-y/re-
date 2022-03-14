import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Typography from '../Typography'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
  label: string
}

const UserInfoItem: React.FC<Props> = ({ className, children, label }) => {
  return (
    <div className={classNames(s.container, className)}>
      <div className={s.title}>
        <span>
          <Typography styleVariant="body2">{label}</Typography>
        </span>
        <SvgIcon className={s.pen} icon="pen.svg" />
      </div>
      {children}
    </div>
  )
}

const s = css`
  .container {
    position: relative;
  }

  .title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 10px;
    white-space: nowrap;
    color: #adadad;
  }

  .pen {
    width: 15px;
    height: 13px;

    opacity: 0;
  }
`

export default UserInfoItem
