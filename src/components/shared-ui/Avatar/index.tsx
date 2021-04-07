import React from 'react'
import { css } from 'astroturf'
import Image from 'next/image'

interface Props {
  src?: string
  className?: string
  width?: number
  height?: number
}

const Avatar: React.FC<Props> = ({ className, src, width, height }) => (
  <div className={className}>
    <Image
      className={s.avatar}
      src={src || '/svg/avatar-placeholder.svg'}
      width={width || 44}
      height={height || 44}
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
