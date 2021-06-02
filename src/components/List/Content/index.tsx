import React from 'react'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import { useLists } from 'src/components/context/ListsContext'
import { TableProvider } from 'src/components/context/TableContext'
import Table from 'src/components/shared-ui/ListTable'
import TableHeader from 'src/components/shared-ui/ListTableHeader'
import ListHeader from 'src/components/shared-ui/ListHeader'

const Content: React.FC = () => {
  const router = useRouter()
  const { state: listsState } = useLists()
  const currentList = listsState?.find(
    (list) => Number(list.id) === Number(router.query.id)
  )

  return currentList ? (
    <div className={s.container}>
      <ListHeader data={currentList} />
      <div className={s.content}>
        <TableProvider>
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
