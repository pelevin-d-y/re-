import React from 'react'
import MainContent from 'src/components/HomeContent'
import Layout from 'src/layouts/Layout'

import { PopupProvider } from 'src/components/context/PopupContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { PinnedProvider } from 'src/components/context/PinnedContext'

const Home: React.FC = () => (
  <Layout>
    <PlaylistsProvider>
      <PlaylistProvider>
        <PinnedProvider>
          <PopupProvider>
            <MainContent />
          </PopupProvider>
        </PinnedProvider>
      </PlaylistProvider>
    </PlaylistsProvider>
  </Layout>
)

export default Home
