import Layout from 'src/layouts/Layout'
import ListContent from 'src/components/ListContent'
import 'react-quill/dist/quill.snow.css'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import EmailModal from 'src/components/shared-ui/modals/ContactModal'
import { TableProvider } from 'src/components/context/TableContext'
import { css } from 'astroturf'
import MultiEmailsModal from 'src/components/shared-ui/modals/MultiEmailsModal'

const List: React.FC = () => (
  <TemplatesProvider>
    <PopupProvider>
      <Layout className={s.layout}>
        <TableProvider>
          <ListContent />
          <EmailModal />
          <MultiEmailsModal />
        </TableProvider>
      </Layout>
    </PopupProvider>
  </TemplatesProvider>
)

const s = css`
  .layout {
    background: var(--white);
  }
`

export default List
