import React, { useMemo } from 'react'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import { useLists } from 'src/components/context/ListsContext'
import { TableProvider } from 'src/components/context/TableContext'
import Table from 'src/components/shared-ui/ListTable'
import TableHeader from 'src/components/shared-ui/ListTableHeader'
import ListHeader from 'src/components/shared-ui/ListHeader'
import ListRecs from '../shared-ui/ListRecs'
import { useClient } from '../context/ClientContext'

const Content: React.FC = () => {
  const router = useRouter()
  const { state: listsState } = useLists()
  const { state: clientState } = useClient()

  const currentList = listsState?.find(
    (list) => Number(list.id) === Number(router.query.id)
  )
  const contacts = useMemo(() => clientState?.contacts, [clientState?.contacts])

  return currentList ? (
    <div className={s.container}>
      <ListHeader data={currentList} />
      <div className={s.content}>
        <TableProvider>
          <ListRecs list={currentList} contacts={contacts} />
          <TableHeader list={currentList} />
          <Table data={currentList} />
        </TableProvider>
      </div>
    </div>
  ) : null
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--white);
  }
`

export default Content
