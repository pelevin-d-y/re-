import React from 'react'
import Layout from 'src/layouts/Layout'
import ListsContent from 'src/components/ListsContent'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PopupProvider } from 'src/components/context/PopupContext'

const Lists: React.FC = () => (
  <Layout>
    <PlaylistsProvider>
      <PopupProvider>
        <ListsContent />
      </PopupProvider>
    </PlaylistsProvider>
  </Layout>
)

export default Lists
