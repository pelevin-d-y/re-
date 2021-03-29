import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { random } from 'lodash'

interface Props {
  className?: string
}

const ColorfulCircle: React.FC<Props> = ({ className }) => {
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
  const colorNumber = random(0, colors.length - 1)

  return (
    <div className={classNames(className, s.circle, s[colors[colorNumber]])} />
  )
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
