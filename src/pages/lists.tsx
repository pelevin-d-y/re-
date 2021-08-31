import React from 'react'
import Layout from 'src/layouts/Layout'
import ListsContent from 'src/components/ListsContent'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import DeleteListModal from 'src/components/shared-ui/modals/DeleteListModal'
import 'react-quill/dist/quill.snow.css'

const Lists: React.FC = () => (
  <Layout>
    <TemplatesProvider>
      <PopupProvider>
        <ListsContent />
        <DeleteListModal />
      </PopupProvider>
    </TemplatesProvider>
  </Layout>
)

export default Lists
