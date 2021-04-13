import Content from 'src/components/Home/Content'
import ContentSidebar from 'src/components/Home/Sidebar'
import Layout from 'src/layouts/Layout'
import EmailModal from 'src/components/shared-ui/modals/EmailModal'
import { PopupProvider } from 'src/components/context/PopupContext'
import { UsersProvider } from 'src/components/context/UsersContext'
import MultiEmailsModal from 'src/components/shared-ui/modals/MultiEmailsModal'
import 'react-quill/dist/quill.snow.css'

const Home: React.FC = () => (
  <Layout>
    <PopupProvider
      value={{
        emailModalIsOpen: false,
        multiEmailsIsOpen: false,
        data: {},
      }}
    >
      <UsersProvider value={{ data: [] }}>
        <Content />
        <ContentSidebar />
        <EmailModal />
        <MultiEmailsModal />
      </UsersProvider>
    </PopupProvider>
  </Layout>
)

export default Home
