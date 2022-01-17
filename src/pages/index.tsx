import React from 'react'
import MainContent from 'src/components/HomeContent'
import Layout from 'src/layouts/Layout'

import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { PinnedProvider } from 'src/components/context/PinnedContext'

const Home: React.FC = () => (
  <Layout>
    <PlaylistsProvider>
      <PlaylistProvider>
        <TemplatesProvider>
          <PopupProvider>
            <PinnedProvider>
              <MainContent />
            </PinnedProvider>
          </PopupProvider>
        </TemplatesProvider>
      </PlaylistProvider>
    </PlaylistsProvider>
  </Layout>
)

export default Home
