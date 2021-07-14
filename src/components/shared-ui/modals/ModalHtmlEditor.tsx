import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import dynamic from 'next/dynamic'
import { useClient } from 'src/components/context/ClientContext'
import parseMessage from 'src/helpers/utils/parse-message'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type Props = {
  className?: string
  data: UserData
  toParse: boolean
}

const modules = {
  toolbar: {
    container: '#editorToolbar',
  },
}

const formats = ['bold']

const HtmlEditorModal: React.FC<Props> = ({
  className,
  data: { name, templateData },
  toParse,
}) => {
  const template = templateData?.Message
  const [value, setValue] = useState(template)
  const { state: clientState } = useClient()

  useEffect(() => {
    let parsedMessage
    if (template && clientState?.name && name) {
      parsedMessage = parseMessage(
        template,
        toParse ? name.split(' ')[0] : undefined,
        toParse ? clientState.name : undefined
      )
    }

    setValue(parsedMessage)
  }, [name, clientState?.name, template, toParse])

  return (
    <div className={classNames(className, s.container, 'modal-editor')}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        modules={modules}
        formats={formats}
        onChange={setValue}
      />
    </div>
  )
}

const s = css`
  .container {
  }
`

export default HtmlEditorModal
