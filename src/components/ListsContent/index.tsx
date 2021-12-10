import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import ListsSidebar from 'src/components/ListsContent/ListsSidebar'
import ListsCatalog from './ListsCatalog'
import ListsContacts from './ListsContacts'

type Props = {
  className?: string
}

const ListsContent: React.FC<Props> = ({ className }) => (
  <div className={classNames(s.container, className)}>
    <div className={s.main}>
      <ListsContacts className={s.contacts} />
      <ListsCatalog />
    </div>
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    flex-flow: row nowrap;
    display: flex;
    padding: 10px 14px 14px;
  }

  .main {
    max-width: 1200px;
    width: 100%;
    padding: 0 12px 12px 0;
    margin-left: auto;
    margin-right: auto;
    @include tablet {
      width: 100%;
      padding: 0;
    }
  }

  .sidebar {
    @include tablet {
      display: none;
    }
  }

  .contacts {
    margin-bottom: 15px;
  }
`

export default ListsContent
