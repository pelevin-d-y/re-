import React from 'react'
import { css } from 'astroturf'

interface Props {
  className?: string
  width?: number
  height?: number
  image?: string
}

const Avatar: React.FC<Props> = ({ className, image, width, height }) => (
  <div
    className={className}
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
  .avatar {
    overflow: hidden;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default Avatar
