import React from 'react'
import { css } from 'astroturf'
import { PopupProvider } from 'src/components/context/PopupContext'
import Layout from 'src/layouts/Layout'
import ContactContent from 'src/components/ContactContent'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { PinnedProvider } from 'src/components/context/PinnedContext'

type Props = {
  className?: string
}

const Contact: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <PlaylistsProvider>
      <PlaylistProvider>
        <PinnedProvider>
          <TemplatesProvider>
            <PopupProvider>
              <ContactContent />
            </PopupProvider>
          </TemplatesProvider>
        </PinnedProvider>
      </PlaylistProvider>
    </PlaylistsProvider>
  </Layout>
)

const s = css`
  .container {
  }
`

export default Contact
