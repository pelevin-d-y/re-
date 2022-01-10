import { css } from 'astroturf'
import classNames from 'classnames'
import React from 'react'

type Props = {
  className?: string
  alt: string
  img: string
  errorLoad?: (isLoad: boolean) => void
  onLoaded?: (isLoaded: boolean) => void
}

const Img: React.FC<Props> = ({ className, alt, img, errorLoad, onLoaded }) => (
  <img
    className={classNames(s.container, className)}
    alt={alt}
    src={img.includes('https') ? img : `images/${img}`}
    onError={() => errorLoad && errorLoad(true)}
  />
)

const s = css`
  .container {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default Img
