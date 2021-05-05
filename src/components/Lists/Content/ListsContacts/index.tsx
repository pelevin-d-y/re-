import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

type Props = {
  className?: string
}

const ListsContacts: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(s.container, className)}>
    contacts
  </CardContainer>
)

const s = css`
  .container {
  }
`

export default ListsContacts
