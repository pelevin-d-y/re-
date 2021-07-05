import React from 'react'

type Props = {
  className?: string
  alt: string
  img: string
}

const Img: React.FC<Props> = ({ className, alt, img }) => (
  <img className={className} alt={alt} src={require(`public/images/${img}`)} />
)

export default Img
