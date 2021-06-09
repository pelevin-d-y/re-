import Layout from 'src/layouts/Layout'
import Content from 'src/components/Lists/MainContent'
import ListsSidebar from 'src/components/Lists/Sidebar'
import CreateListModal from 'src/components/shared-ui/modals/CreateListModal'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import 'react-quill/dist/quill.snow.css'

const Lists: React.FC = () => (
  <Layout>
    <TemplatesProvider>
      <PopupProvider>
        <div className={s.container}>
          <Content className={s.content} />
          <ListsSidebar className={s.sidebar} />
        </div>
        <CreateListModal />
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

  .content {
    @include tablet {
      width: 100%;
    }
  }

  .sidebar {
    @include tablet {
      display: none;
    }
  }
`

export default Lists
