import React from 'react'
import Layout from 'src/layouts/Layout'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import { TableProvider } from 'src/components/context/TableContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import AllPinnedContent from 'src/components/AllPinnedContent'
import { PinnedProvider } from 'src/components/context/PinnedContext'

type Props = {
  className?: string
}

const Pinned: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <TemplatesProvider>
      <PlaylistsProvider>
        <PlaylistProvider>
          <PinnedProvider>
            <PopupProvider>
              <TableProvider>
                <AllPinnedContent />
              </TableProvider>
            </PopupProvider>
          </PinnedProvider>
        </PlaylistProvider>
      </PlaylistsProvider>
    </TemplatesProvider>
  </Layout>
)

const s = css`
  .layout {
    background: var(--neutral5);
  }
`

export default Pinned
