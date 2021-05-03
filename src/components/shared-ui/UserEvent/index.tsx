import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'

type Color =
  | 'black'
  | 'blue'
  | 'lightBlue'
  | 'green'
  | 'red'
  | 'ginger'
  | 'grey'
  | 'lightGrey'

type Props = {
  className?: string
  classNameCircle?: string
  text: string
  circleColor?: Color
}

const UserEvent: React.FC<Props> = ({
  className,
  classNameCircle,
  circleColor,
  text,
}) => (
  <div className={classNames(s.container, className)}>
    <ColorfulCircle
      className={classNames(classNameCircle, s.circle)}
      color={circleColor}
    />
    {text}
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .circle {
    flex: 1 0 auto;
    max-width: 8px;
  }
`

export default UserEvent
