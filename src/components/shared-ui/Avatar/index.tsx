import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { calculateColorByStraight } from 'src/helpers/utils/calculate-straight'
import SvgIcon from '../SvgIcon'

type Props = {
  className?: string
  width?: number
  height?: number
  image?: string
  straight?: string | number
}

const Avatar: React.FC<Props> = ({
  className,
  image,
  width,
  height,
  straight,
}) => {
  calculateColorByStraight(straight)
  return (
    <div
      className={classNames(s.container, className, straight && s.straight)}
      style={{ width: width || 47, height: height || 47 }}
    >
      {image ? (
        <img alt="avatar" className={s.avatar} src={image} />
      ) : (
        <SvgIcon icon={require('public/svg/avatar-placeholder.svg?include')} />
      )}
    </div>
  )
}

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
