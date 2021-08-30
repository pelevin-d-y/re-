import React, { useEffect, useMemo, useState } from 'react'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import { useLists } from 'src/components/context/ListsContext'
import { TableProvider } from 'src/components/context/TableContext'
import Table from 'src/components/shared-ui/ListTable'
import TableHeader from 'src/components/shared-ui/ListTableHeader'
import ListHeader from 'src/components/shared-ui/ListHeader'
import { getPlaylist } from 'src/api'
import ListRecs from '../shared-ui/ListRecs'
import { useClient } from '../context/ClientContext'

const Content: React.FC = () => {
  const router = useRouter()
  const { state: clientState } = useClient()
  const [list, setList] = useState<any>(null)

  useEffect(() => {
    getPlaylist(router.query.id as string).then((res) => {
      setList(res.data[0])
    })
  }, [router.query.id])

  const contacts = useMemo(() => clientState?.contacts, [clientState?.contacts])

  console.log('list', list)
  return list ? (
    <div className={s.container}>
      {list && <ListHeader data={list} />}
      <div className={s.content}>
        <TableProvider>
          {/* <ListRecs list={currentList} contacts={contacts} /> */}
          {/* <TableHeader list={currentList} /> */}
          {/* <Table data={list} /> */}
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
