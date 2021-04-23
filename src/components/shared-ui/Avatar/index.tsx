import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'

type Props = {
  className?: string
  width?: number
  height?: number
  image?: string
}

const Avatar: React.FC<Props> = ({ className, image, width, height }) => (
  <div
    className={classNames(s.container, className)}
    style={{ width: width || 47, height: height || 47 }}
  >
    <img
      alt=""
      className={s.avatar}
      src={image || require('public/svg/avatar-placeholder.svg')}
    />
  </div>
)

const s = css`
  .container {
    overflow: hidden;
    border-radius: 50%;
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default Avatar
