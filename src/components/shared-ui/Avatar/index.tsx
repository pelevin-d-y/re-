import React from 'react'
import { css } from 'astroturf'
import Image from 'next/image'

interface Props {
  className?: string
  width?: number
  height?: number
  image?: string
}

const Avatar: React.FC<Props> = ({ className, image, width, height }) => (
  <div
    className={className}
    style={{ width: width || 40, height: height || 40 }}
  >
    <img
      alt=""
      className={s.avatar}
      src={image || require('public/svg/avatar-placeholder.svg?include')}
    />
  </div>
)

const s = css`
  .avatar {
    overflow: hidden;
    border-radius: 50%;
  }
`

export default Avatar
