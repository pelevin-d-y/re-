import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import dynamic from 'next/dynamic'
import { usePopup } from 'src/components/context/PopupContext'
import { useClient } from 'src/components/context/ClientContext'
import parseEmailMessage from 'src/helpers/utils/parse-email-message'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type Props = {
  className?: string
  name?: string
  event?: string
}

const HtmlEditorModal: React.FC<Props> = ({ className, name, event }) => {
  const [value, setValue] = useState<string | undefined>()
  const {
    state: { data },
  } = usePopup()
  const {
    state: { data: clientData },
  } = useClient()

  useEffect(() => {
    let parsedMessage
    if (data.templateData?.Message && clientData.name) {
      parsedMessage = parseEmailMessage(
        data.templateData.Message,
        name,
        clientData.name
      )
    }
    const template =
      parsedMessage ||
      `<p>Hi ${
        name || '&lt;unknown&gt;'
      },</p><p> </p><p>You recently introduced me to "${
        event || '&lt;Intro Name&gt;'
      }" (thanks again!).</p><p> </p><p>"${
        event || '&lt;Intro Name&gt;'
      }" and I spoke about...</p><p> </p> <p>Next steps are...</p><p> </p><p>How's everything with you?</p><p> </p><p>Best,</p><p> </p><p>${
        clientData.name || '&lt;Client Name&gt;'
      }</p>`
    setValue(template)
  }, [name, event, data.templateData, clientData.name])

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
