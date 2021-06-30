import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
}

const PersonalizationContent: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, s.container)}>Personalization</div>
  )
}

const s = css`
  .container {
  }
`

export default PersonalizationContent
