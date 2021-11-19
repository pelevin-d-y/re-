import React from 'react'
import { css } from 'astroturf'
import Table from 'src/components/ListContent/ListTable'
import TableHeader from 'src/components/shared-ui/ListTableHeader'
import ListHeader from 'src/components/shared-ui/ListHeader'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { useClient } from 'src/components/context/ClientContext'
import { TableProvider } from 'src/components/context/TableContext'
import { LoaderComponent } from '../shared-ui/Loader'
import ListRecs from '../shared-ui/ListRecs'

const Content: React.FC = () => {
  const { state: playlistData } = usePlaylist()
  const { state: clientState } = useClient()

  return playlistData ? (
    <div className={s.container}>
      {playlistData && <ListHeader data={playlistData} />}
      <div className={s.content}>
        <TableProvider>
          {clientState.data?.contacts && (
            <ListRecs
              contacts={clientState.data.contacts}
              playlistData={playlistData}
            />
          )}
          {playlistData && <TableHeader list={playlistData} />}
          {playlistData && <Table data={playlistData} />}
        </TableProvider>
      </div>
    </div>
  ) : (
    <div className={s.loader}>
      <LoaderComponent />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--white);
  }

  .loader {
    position: relative;
    height: 100px;
  }
`

export default Content
