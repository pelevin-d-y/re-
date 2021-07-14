import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  classes?: {
    container?: string
    button?: string
  }
  description: string
  title: string
  features: string[]
  buttonText: string
}

const Card: React.FC<Props> = ({
  classes,
  description,
  title,
  features,
  buttonText,
}) => (
  <div className={classNames(classes?.container, s.container)}>
    <div className={s.description}>{description}</div>
    <div className={s.title}>{title}</div>
    <ul className={s.list}>
      {features.map((item) => (
        <li className={s.feature} key={item}>
          {item}
        </li>
      ))}
    </ul>
    <button type="button">{buttonText}</button>
  </div>
)

const s = css`
  .container {
  }
`

export default Card
