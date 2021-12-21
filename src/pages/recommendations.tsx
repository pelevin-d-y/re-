import React from 'react'
import Layout from 'src/layouts/Layout'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import AllRecommendationsContent from 'src/components/AllRecsContent'
import ComposeModal from 'src/components/shared-ui/modals/ComposeModal'
import { TableProvider } from 'src/components/context/TableContext'
import ComposeModalMulti from 'src/components/shared-ui/modals/ComposeModalMulti'
import CreateListModal from 'src/components/shared-ui/modals/CreateListModal'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import 'react-quill/dist/quill.snow.css'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'

type Props = {
  className?: string
}

const Personalization: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <TemplatesProvider>
      <PlaylistsProvider>
        <PlaylistProvider>
          <PopupProvider>
            <TableProvider>
              <AllRecommendationsContent />
            </TableProvider>
            <ComposeModal />
            <ComposeModalMulti />
            <CreateListModal />
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

export default Personalization
