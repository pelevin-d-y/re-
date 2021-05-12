import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Layout from 'src/layouts/Layout'
import Content from 'src/components/List/Content'
import { ListsProvider } from 'src/components/context/ListsContext'
import 'react-quill/dist/quill.snow.css'
import testList from 'src/testLists'

const List: React.FC = () => (
  <Layout>
    <ListsProvider>
      <Content />
    </ListsProvider>
  </Layout>
)

export async function getStaticPaths() {
  const paths = testList.map((list) => ({
    params: {
      id: `${list.id}`,
    },
  }))
  console.log('paths', paths)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = testList.find(
    (list) => Number(list.id) === Number(params?.id)
  )
  return {
    props: {
      postData,
    },
  }
}

export default List
