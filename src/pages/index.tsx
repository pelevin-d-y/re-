import Content from 'src/components/Home/Content'
import ContentSidebar from 'src/components/Home/Sidebar'
import Layout from 'src/layouts/Layout'
import EmailModal from 'src/components/shared-ui/modals/EmailModal'
import { PopupProvider } from 'src/helpers/context/PopupContext'
import 'react-quill/dist/quill.snow.css'

const Home: React.FC = () => (
  <Layout>
    <PopupProvider
      value={{
        isOpen: false,
        data: {},
      }}
    >
      <Content />
      <ContentSidebar />
      <EmailModal />
    </PopupProvider>
  </Layout>
)

export default Home
