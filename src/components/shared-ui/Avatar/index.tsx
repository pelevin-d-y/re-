import React, { useState } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import SvgIcon from '../SvgIcon'
import Img from '../Img'

type Props = {
  className?: string
  width?: number
  height?: number
  image?: string | null
  name: string
  strength?: string | number | null
}

const Avatar: React.FC<Props> = ({
  className,
  image,
  width,
  height,
  strength,
  name,
}) => {
  const [isError, setIsError] = useState(false)
  const errorLoad = (status: boolean) => {
    setIsError(status)
  }

  const firstSymbols = (str: string) =>
    str
      .split(/\s/)
      // eslint-disable-next-line no-return-assign, no-param-reassign
      .reduce((acc, word) => (acc += word.slice(0, 1)).toUpperCase(), '')
      .slice(0, 2)

  const renderPlaceholder = () => {
    if (name) {
      return (
        <div className={s.placeholder}>
          <span>{name && firstSymbols(name)}</span>
        </div>
      )
    }

    return <SvgIcon icon="avatar-placeholder.svg" className={s.svgIcon} />
  }
  return (
    <div
      className={classNames(s.container, className, strength && s[strength])}
      style={{ width: width || 47, height: height || 47 }}
    >
      {!isError && image ? (
        <Img
          alt="avatar"
          className={s.avatar}
          img={image}
          errorLoad={errorLoad}
        />
      ) : (
        renderPlaceholder()
      )}
    </div>
  )
}

const s = css`
  .container {
    font-size: 16px;
    position: relative;
    box-sizing: content-box;
    flex: 0 0 auto;
    border-radius: 50%;
    background: var(--shades2);
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

  .placeholder {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 100%;

    border-radius: 50%;
    background: var(--primary2);
    color: var(--primary1);
  }
`

export default Avatar
