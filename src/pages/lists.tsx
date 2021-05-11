import Layout from 'src/layouts/Layout'
import Content from 'src/components/Lists/Content'
import ContentSidebar from 'src/components/Lists/Sidebar'
import { PopupProvider } from 'src/components/context/PopupContext'
import { UsersProvider } from 'src/components/context/UsersContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { ListsProvider } from 'src/components/context/ListsContext'
import { css } from 'astroturf'
import 'react-quill/dist/quill.snow.css'

const Lists: React.FC = () => (
  <Layout>
    <UsersProvider>
      <TemplatesProvider>
        <PopupProvider>
          <ListsProvider>
            <div className={s.container}>
              <Content />
              <ContentSidebar />
            </div>
          </ListsProvider>
        </PopupProvider>
      </TemplatesProvider>
    </UsersProvider>
  </Layout>
)

const s = css`
  .container {
    flex-flow: row nowrap;
    display: flex;
    padding: 10px 14px 14px;
  }
`

export default Lists
