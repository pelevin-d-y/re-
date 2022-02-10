import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import ReactQuill, { Quill } from 'react-quill'

type Props = {
  className?: string
  value?: string
  setEditorValue: (field: SendMessageField, value: any) => void
}

const modules = {
  toolbar: {
    container: '#editorToolbar',
    toolbar: ['bold', 'italic', 'link', 'image', 'size', 'list'],
  },
}

const Size = Quill.import('attributors/style/size')
Size.whitelist = ['32px', '24px', '13px', '9px']
Quill.register(Size, true)

const HtmlEditorModal: React.FC<Props> = ({
  className,
  value,
  setEditorValue,
}) => {
  return (
    <div className={classNames(className, s.container, 'modal-editor')}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        modules={modules}
        onChange={(quillValue) => {
          setEditorValue('body', quillValue)
        }}
      />
    </div>
  )
}

const s = css`
  .container {
  }
`

export default HtmlEditorModal
