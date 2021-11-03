import React from 'react'

type Props = {
  className?: string
  alt: string
  img: string
  errorLoad?: (isLoad: boolean) => void
}

const Img: React.FC<Props> = ({ className, alt, img, errorLoad }) => (
  <img
    className={className}
    alt={alt}
    src={img.includes('https') ? img : `images/${img}`}
    onError={() => errorLoad && errorLoad(true)}
  />
)

export default Img
