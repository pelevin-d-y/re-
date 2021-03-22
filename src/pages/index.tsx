import Content from 'src/components/Home/Content'
import ContentSidebar from 'src/components/Home/ContentSidebar'
import Layout from 'src/layouts/Layout'

const Home = (): JSX.Element => (
  <Layout>
    <Content />
    <ContentSidebar />
  </Layout>
) 

export default Home
