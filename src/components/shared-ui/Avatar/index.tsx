import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Image from 'next/image'

interface Props {
  src?: string
  className?: string
  width?: number
  height?: number
}

const name: React.FC<Props> = ({ className, src, width, height }) => (
  <Image
    className={classNames(className, s.avatar)}
    src={src || '/svg/avatar-placeholder.svg'}
    width={width || 44}
    height={height || 44}
  />
)

const s = css`
  .avatar {
    overflow: hidden;
    border-radius: 50%;
  }
`

export default name
