import Layout from 'src/layouts/Layout'
import ListContent from 'src/components/ListContent'
import 'react-quill/dist/quill.snow.css'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import ComposeModal from 'src/components/shared-ui/modals/ComposeModal'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { css } from 'astroturf'
import ComposeModalMulti from 'src/components/shared-ui/modals/ComposeModalMulti'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'

const List: React.FC = () => (
  <TemplatesProvider>
    <PopupProvider>
      <Layout className={s.layout}>
        <PlaylistsProvider>
          <PlaylistProvider>
            <ListContent />
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
