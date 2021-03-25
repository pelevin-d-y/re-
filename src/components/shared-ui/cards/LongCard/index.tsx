import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from '../CardContainer'

const LongCard: React.FC = () => (
  <CardContainer className={classNames(s.container)}>
    Long container
  </CardContainer>
)

const s = css`
  .container {
  }
`

export default LongCard
