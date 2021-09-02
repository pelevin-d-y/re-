import React, { useEffect, useState } from 'react'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import Table from 'src/components/shared-ui/ListTable'
import TableHeader from 'src/components/shared-ui/ListTableHeader'
import ListHeader from 'src/components/shared-ui/ListHeader'
import { getContactsMutable, getPlaylist } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { useTable } from 'src/components/context/TableContext'
import ListRecs from '../shared-ui/ListRecs'

const Content: React.FC = () => {
  const {
    state: { data },
  } = useTable()

  return data ? (
    <div className={s.container}>
      {data && <ListHeader data={data} />}
      <div className={s.content}>
        {/* <ListRecs list={currentList} contacts={contacts} /> */}
        {data && <TableHeader list={data} />}
        {data && <Table data={data} />}
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
