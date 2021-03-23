import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from '../CardContainer'

const LongCard: React.FC = () => (
  <CardContainer className={classNames(styles.container)}>
    Long container
  </CardContainer>
)

const styles = css`
  .container {
  }
`

export default LongCard
