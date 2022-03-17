import React from 'react'
import Layout from 'src/layouts/Layout'
import CreateListContent from 'src/components/CreateListContent'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'

const List: React.FC = () => (
  <Layout className={s.layout}>
    <PlaylistsProvider>
      <PlaylistProvider>
        <PopupProvider>
          <CreateListContent />
        </PopupProvider>
      </PlaylistProvider>
    </PlaylistsProvider>
  </Layout>
)

const s = css`
  .layout {
    background: var(--shades2);
  }
`

export default List
