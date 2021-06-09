import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import ListsCatalog from './ListsCatalog'
import ListsContacts from './ListsContacts'

type Props = {
  className?: string
}

const ListsContent: React.FC<Props> = ({ className }) => (
  <div className={classNames(s.container, className)}>
    <ListsContacts className={s.contacts} />
    <ListsCatalog />
  </div>
)

const s = css`
  .container {
    padding: 0 12px 12px 0;
  }

  .contacts {
    margin-bottom: 15px;
  }
`

export default ListsContent
