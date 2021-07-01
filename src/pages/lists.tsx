import Layout from 'src/layouts/Layout'
import ListsContent from 'src/components/ListsContent'
import CreateListModal from 'src/components/shared-ui/modals/CreateListModal'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import 'react-quill/dist/quill.snow.css'

const Lists: React.FC = () => (
  <Layout>
    <TemplatesProvider>
      <PopupProvider>
        <ListsContent />
        <CreateListModal />
      </PopupProvider>
    </TemplatesProvider>
  </Layout>
)

export default Lists
