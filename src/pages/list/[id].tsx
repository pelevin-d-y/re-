import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from 'src/layouts/Layout'
import Content from 'src/components/List/Content'
import 'react-quill/dist/quill.snow.css'
import testList from 'src/testLists'
import AddUserModal from 'src/components/shared-ui/modals/AddUserModal'
import { PopupProvider } from 'src/components/context/PopupContext'

const List: React.FC = () => (
  <PopupProvider>
    <Layout>
      <Content />
      <AddUserModal />
    </Layout>
  </PopupProvider>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = testList.map((list) => ({
    params: {
      id: `${list.id}`,
    },
  }))

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
