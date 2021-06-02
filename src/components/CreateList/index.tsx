import React from 'react'
import { css } from 'astroturf'
import { TableProvider } from 'src/components/context/TableContext'
import Table from 'src/components/shared-ui/ListTable'
import TableHeader from 'src/components/shared-ui/ListTableHeader'
import CreateListHeader from './CreateListHeader'

const Content: React.FC = () => (
  <div className={s.container}>
    <CreateListHeader />
    <div className={s.content}>
      {/* <TableProvider>
        <TableHeader list={[]} />
        <Table data={{}} />
      </TableProvider> */}
    </div>
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--white);
  }
`

export default Content
