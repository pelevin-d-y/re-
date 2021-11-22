import React from 'react'
import MainContent from 'src/components/HomeContent'
import Layout from 'src/layouts/Layout'
import ContactModal from 'src/components/shared-ui/modals/ContactModal'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import MultiEmailsModal from 'src/components/shared-ui/modals/MultiEmailsModal'
import ModalPinnedContacts from 'src/components/shared-ui/modals/ModalPinnedContacts'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import 'react-quill/dist/quill.snow.css'

const Home: React.FC = () => (
  <Layout>
    <PlaylistsProvider>
      <TemplatesProvider>
        <PopupProvider>
          <MainContent />
          <ContactModal />
          <MultiEmailsModal />
          <ModalPinnedContacts />
        </PopupProvider>
      </TemplatesProvider>
    </PlaylistsProvider>
  </Layout>
)

export default Home
