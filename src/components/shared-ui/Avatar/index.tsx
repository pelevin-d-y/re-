import React, { useState, useEffect } from 'react'
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
  const [color, setColor] = useState<'red' | 'green' | 'orange' | null>(null)
  useEffect(() => {
    if (straight) {
      setColor(calculateColorByStraight(straight))
    }
  }, [straight])
  return (
    <div
      className={classNames(s.container, className, color && s[color])}
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
    position: relative;
    box-sizing: content-box;
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
