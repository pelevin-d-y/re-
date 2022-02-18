import React, { useEffect } from 'react'
import { css } from 'astroturf'
import Table from 'src/components/ListContent/ListTable'

import ListHeader from 'src/components/shared-ui/ListHeader'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { useClient } from 'src/components/context/ClientContext'
import { TableProvider } from 'src/components/context/TableContext'
import { useRouter } from 'next/router'
import { LoaderAbsolute } from '../shared-ui/Loader'
import ListRecs from '../shared-ui/ListRecs'
import TableActions from '../shared-ui/TableActions'
import AddUserView from '../shared-ui/AddUserView'

const Content: React.FC = () => {
  const { state: playlistData, getPlaylistData } = usePlaylist()
  const { state: clientState } = useClient()
  const router = useRouter()

  useEffect(() => {
    if (router.query.id) {
      getPlaylistData(router.query.id as string)
    }
  }, [getPlaylistData, router.query.id])

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

          {playlistData && (
            <div className={s.tableActions}>
              <AddUserView listId={playlistData.playlist_id} />
              <TableActions
                data={playlistData}
                buttons={[
                  // 'addContactToListPopover',
                  'contact',
                  // 'dots',
                  // 'filter',
                  'removeContacts',
                ]}
              />
            </div>
          )}
          {playlistData && <Table data={playlistData} />}
        </TableProvider>
      </div>
    </div>
  ) : (
    <div className={s.loader}>
      <LoaderAbsolute />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--shades2);
  }

  .tableActions {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 21px 23px 23px 20px;

    @include mobile {
      padding: 16px 12px;

      flex-flow: column nowrap;
      align-items: flex-start;
    }
  }

  .loader {
    position: relative;
    height: 100px;
  }
`

export default Content
