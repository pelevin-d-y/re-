import Layout from 'src/layouts/Layout'
import Content from 'src/components/List/Content'
import { ListsProvider } from 'src/components/context/ListsContext'
import 'react-quill/dist/quill.snow.css'

const List: React.FC = () => (
  <Layout>
    <ListsProvider>
      <Content />
    </ListsProvider>
  </Layout>
)

export default List
