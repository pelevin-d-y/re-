import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { random } from 'lodash'

type Props = {
  className?: string
  color?:
    | 'black'
    | 'blue'
    | 'lightBlue'
    | 'green'
    | 'red'
    | 'ginger'
    | 'grey'
    | 'lightGrey'
}
const colors = [
  'black',
  'blue',
  'lightBlue',
  'green',
  'red',
  'ginger',
  'grey',
  'lightGrey',
]

const ColorfulCircle: React.FC<Props> = ({ className, color: colorProp }) => {
  const [color, setColor] = useState('')

  useEffect(() => {
    if (colorProp) {
      setColor(colorProp)
    } else {
      const colorNumber = random(0, colors.length - 1)
      setColor(colors[colorNumber])
    }
  }, [colorProp])

  return <div className={classNames(className, s.circle, s[color])} />
}

const s = css`
  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 6px;
    border-radius: 50%;
  }
  .black {
    background: var(--black);
  }
  .blue {
    background: var(--blue);
  }
  .lightBlue {
    background: var(--lightBlue);
  }
  .green {
    background: var(--green);
  }
  .red {
    background: var(--red);
  }
  .ginger {
    background: var(--ginger);
  }
  .grey {
    background: var(--grey);
  }
  .lightGrey {
    background: var(--lightGrey);
  }
`

export default ColorfulCircle
