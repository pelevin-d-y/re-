import Layout from 'src/layouts/Layout'
import Content from 'src/components/Lists/Content'
import ContentSidebar from 'src/components/Lists/Sidebar'
import { PopupProvider } from 'src/components/context/PopupContext'
import { UsersProvider } from 'src/components/context/UsersContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import 'react-quill/dist/quill.snow.css'

const Home: React.FC = () => (
  <Layout>
    <UsersProvider>
      <TemplatesProvider>
        <PopupProvider>
          <Content />
          <ContentSidebar />
        </PopupProvider>
      </TemplatesProvider>
    </UsersProvider>
  </Layout>
)

export default Home
