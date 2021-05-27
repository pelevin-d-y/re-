import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from 'src/layouts/Layout'
import Content from 'src/components/List/Content'
import 'react-quill/dist/quill.snow.css'
import testList from 'src/testLists'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import EmailModal from 'src/components/shared-ui/modals/ContactModal'
import { css } from 'astroturf'
import MultiEmailsModal from 'src/components/shared-ui/modals/MultiEmailsModal'

const List: React.FC = () => (
  <TemplatesProvider>
    <PopupProvider>
      <Layout className={s.layout}>
        <Content />
        <EmailModal />
        <MultiEmailsModal />
      </Layout>
    </PopupProvider>
  </TemplatesProvider>
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

const s = css`
  .layout {
    background: var(--white);
  }
`

export default List
