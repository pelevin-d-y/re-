import React from 'react'
import Layout from 'src/layouts/Layout'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const SignUp: React.FC = () => {
  const formats = ['bold', 'italic', 'link', 'image', 'size', 'list']
  const modules = {
    toolbar: ['bold', 'italic', 'link', 'image', 'size', 'list'],
  }

  return (
    <Layout>
      <ReactQuill theme="snow" formats={formats} modules={modules} />
    </Layout>
  )
}
export default SignUp
