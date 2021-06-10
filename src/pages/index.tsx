import MainContent from 'src/components/Home/MainContent'
import ContentSidebar from 'src/components/Home/Sidebar'
import Layout from 'src/layouts/Layout'
import EmailModal from 'src/components/shared-ui/modals/ContactModal'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import MultiEmailsModal from 'src/components/shared-ui/modals/MultiEmailsModal'
import RecommendationsModal from 'src/components/shared-ui/modals/RecommendationsModal'
import TemplatesModal from 'src/components/shared-ui/modals/TemplatesModal'
import { css } from 'astroturf'
import 'react-quill/dist/quill.snow.css'

const Home: React.FC = () => (
  <Layout>
    <TemplatesProvider>
      <PopupProvider>
        <div className={s.container}>
          <MainContent />
          <ContentSidebar className={s.sidebar} />
        </div>
        <EmailModal />
        <MultiEmailsModal />
        <RecommendationsModal />
        <TemplatesModal />
      </PopupProvider>
    </TemplatesProvider>
  </Layout>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    flex-flow: row nowrap;
    display: flex;
    padding: 10px 14px 14px;
  }

  .sidebar {
    @include tablet {
      display: none;
    }
  }
`

export default Home
