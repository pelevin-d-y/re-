import React from 'react'
import Layout from 'src/layouts/Layout'
import CreateListContent from 'src/components/CreateListContent'
import 'react-quill/dist/quill.snow.css'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import ComposeModal from 'src/components/shared-ui/modals/ComposeModal'
import { css } from 'astroturf'
import ComposeModalMulti from 'src/components/shared-ui/modals/ComposeModalMulti'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'

const List: React.FC = () => (
  <TemplatesProvider>
    <PopupProvider>
      <Layout className={s.layout}>
        <PlaylistsProvider>
          <PlaylistProvider>
            <CreateListContent />
            <ComposeModal />
            <ComposeModalMulti />
          </PlaylistProvider>
        </PlaylistsProvider>
      </Layout>
    </PopupProvider>
  </TemplatesProvider>
)

const s = css`
  .layout {
    background: var(--white);
  }
`

export default List
