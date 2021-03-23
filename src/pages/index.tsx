import Content from 'src/components/Home/Content'
import ContentSidebar from 'src/components/Home/Sidebar'
import Layout from 'src/layouts/Layout'

const Home: React.FC = () => (
  <Layout>
    <Content />
    <ContentSidebar />
  </Layout>
)

export default Home
