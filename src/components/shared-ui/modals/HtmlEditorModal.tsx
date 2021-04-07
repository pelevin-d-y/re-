import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Props {
  className?: string
  name?: string
}

const HtmlEditorModal: React.FC<Props> = ({ className, name }) => {
  const template = `<p>Hi ${name},</p><p> </p><p>You recently introduced me to &lt;Intro Name&gt; (thanks again!).</p><p> </p><p>&lt;Intro Name&gt; and I spoke about...</p><p> </p> <p>Next steps are...</p><p> </p><p>How's everything with you?</p><p> </p><p>Best,</p><p> </p><p>&lt;Client Name&gt;</p>`

  const [value, setValue] = useState(template)

  return (
    <div className={classNames(className, s.container)}>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

const s = css`
  .container {
  }
`

export default HtmlEditorModal
