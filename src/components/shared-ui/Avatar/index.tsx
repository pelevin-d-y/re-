import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import SvgIcon from '../SvgIcon'
import Img from '../Img'

type Props = {
  className?: string
  width?: number
  height?: number
  image?: string | null
  strength?: string | number
}

const Avatar: React.FC<Props> = ({
  className,
  image,
  width,
  height,
  strength,
}) => (
  <div
    className={classNames(s.container, className, strength && s[strength])}
    style={{ width: width || 47, height: height || 47 }}
  >
    {image ? (
      <Img alt="avatar" className={s.avatar} img={image} />
    ) : (
      <SvgIcon icon={require('public/svg/avatar-placeholder.svg?include')} />
    )}
  </div>
)

const s = css`
  .container {
    position: relative;
    box-sizing: content-box;
    flex: 0 0 auto;
    border-radius: 50%;
    &::after {
      content: '';
      z-index: 1;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 8px;
      height: 8px;
      border: 2px solid transparent;
      border-radius: 50%;
    }
  }

  .avatar {
    width: 100%;
    height: 100%;

    border-radius: 50%;
    object-fit: cover;
  }

  .red {
    border: 2px solid #ff4949;
    &::after {
      background: #ff4949;
      border-color: #fff;
    }
  }

  .green {
    border: 2px solid #16bb58;
    &::after {
      background: #16bb58;
      border-color: #fff;
    }
  }

  .orange {
    border: 2px solid #ff9900;
    &::after {
      background: #ff9900;
      border-color: #fff;
    }
  }
`

export default Avatar
