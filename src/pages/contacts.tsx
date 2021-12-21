import React from 'react'
import Layout from 'src/layouts/Layout'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import { TableProvider } from 'src/components/context/TableContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import AllContactsContent from 'src/components/AllContactsContent'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'

type Props = {
  className?: string
}

const Contacts: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <TemplatesProvider>
      <PlaylistsProvider>
        <PlaylistProvider>
          <PopupProvider>
            <TableProvider>
              <AllContactsContent />
            </TableProvider>
          </PopupProvider>
        </PlaylistProvider>
      </PlaylistsProvider>
    </TemplatesProvider>
  </Layout>
)

const s = css`
  .layout {
    background: var(--lightGrey);
  }
`

export default Contacts
