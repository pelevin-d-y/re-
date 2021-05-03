import React from 'react'
import ReactStars from 'react-stars'

type Props = {
  className: string
}

const Stars: React.FC<Props> = ({ className }) => (
  <ReactStars
    className={className}
    count={5}
    size={20}
    half={false}
    color1="#D8D8D8"
    color2="#FFB100"
  />
)

export default Stars
