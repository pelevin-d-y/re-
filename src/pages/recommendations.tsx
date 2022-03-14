import React from 'react'
import Layout from 'src/layouts/Layout'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import AllRecommendationsContent from 'src/components/AllRecsContent'
import { TableProvider } from 'src/components/context/TableContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { PinnedProvider } from 'src/components/context/PinnedContext'

type Props = {
  className?: string
}

const Recommendations: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <TemplatesProvider>
      <PinnedProvider>
        <PlaylistsProvider>
          <PlaylistProvider>
            <PopupProvider>
              <TableProvider>
                <AllRecommendationsContent />
              </TableProvider>
            </PopupProvider>
          </PlaylistProvider>
        </PlaylistsProvider>
      </PinnedProvider>
    </TemplatesProvider>
  </Layout>
)

const s = css`
  .layout {
    background: var(--neutral5);
  }
`

export default Recommendations
