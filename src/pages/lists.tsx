import React from 'react'
import Layout from 'src/layouts/Layout'
import ListsContent from 'src/components/ListsContent'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'

const Lists: React.FC = () => (
  <Layout>
    <PlaylistsProvider>
      <TemplatesProvider>
        <PopupProvider>
          <ListsContent />
        </PopupProvider>
      </TemplatesProvider>
    </PlaylistsProvider>
  </Layout>
)

export default Lists
