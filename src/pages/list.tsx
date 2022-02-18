import Layout from 'src/layouts/Layout'
import ListContent from 'src/components/ListContent'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { css } from 'astroturf'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'

const List: React.FC = () => (
  <TemplatesProvider>
    <Layout className={s.layout}>
      <PlaylistsProvider>
        <PlaylistProvider>
          <PopupProvider>
            <ListContent />
          </PopupProvider>
        </PlaylistProvider>
      </PlaylistsProvider>
    </Layout>
  </TemplatesProvider>
)

const s = css`
  .layout {
    background: var(--shades2);
  }
`

export default List
