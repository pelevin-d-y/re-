import React from 'react'
import MainContent from 'src/components/HomeContent'
import Layout from 'src/layouts/Layout'
import ComposeModal from 'src/components/shared-ui/modals/ComposeModal'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import ComposeModalMulti from 'src/components/shared-ui/modals/ComposeModalMulti'
import ModalPinnedContacts from 'src/components/shared-ui/modals/ModalPinnedContacts'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import 'react-quill/dist/quill.snow.css'

const Home: React.FC = () => (
  <Layout>
    <PlaylistsProvider>
      <PlaylistProvider>
        <TemplatesProvider>
          <PopupProvider>
            <MainContent />
            <ComposeModal />
            <ComposeModalMulti />
            <ModalPinnedContacts />
          </PopupProvider>
        </TemplatesProvider>
      </PlaylistProvider>
    </PlaylistsProvider>
  </Layout>
)

export default Home
