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

const HtmlEditorModal: React.FC<Props> = ({
  className,
  data: { name, templateData },
  toParse,
}) => {
  const template = templateData?.Message
  const [value, setValue] = useState(template)
  const {
    state: { data: clientData },
  } = useClient()

  useEffect(() => {
    let parsedMessage
    if (template && clientData?.name && name) {
      parsedMessage = parseMessage(
        template,
        toParse ? name.split(' ')[0] : undefined,
        toParse ? clientData.name : undefined
      )
    }

    setValue(parsedMessage)
  }, [name, clientData?.name, template, toParse])

  return (
    <div className={classNames(className, s.container)}>
      <ReactQuill theme="snow" value={value || ''} onChange={setValue} />
    </div>
  )
}

const s = css`
  .container {
  }
`

export default HtmlEditorModal
