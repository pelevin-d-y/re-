import React from 'react'
import MainContent from 'src/components/HomeContent'
import Layout from 'src/layouts/Layout'
import EmailModal from 'src/components/shared-ui/modals/ContactModal'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import MultiEmailsModal from 'src/components/shared-ui/modals/MultiEmailsModal'
import IgnoreModal from 'src/components/shared-ui/modals/IgnoreModal'
import 'react-quill/dist/quill.snow.css'

const Home: React.FC = () => (
  <Layout>
    <TemplatesProvider>
      <PopupProvider>
        <MainContent />
        <EmailModal />
        <MultiEmailsModal />
        <IgnoreModal />
      </PopupProvider>
    </TemplatesProvider>
  </Layout>
)

export default Home
