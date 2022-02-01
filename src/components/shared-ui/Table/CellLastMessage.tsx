import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useInView } from 'react-intersection-observer'
import { get } from 'src/api'
import getLastMessage from 'src/helpers/utils/get-last-message'
import formatLastMessage from 'src/helpers/utils/format-last-message'
import { formatDate } from 'src/helpers/utils/parseTime'
import classnames from 'classnames'
import { LoaderStatic } from '../Loader'

type Props = {
  className?: string
  data: FormattedContact
}

const CellLastMessage: React.FC<Props> = ({ className, data }) => {
  const { ref, inView } = useInView()
  const [isLoading, setIsLoading] = useState(false)
  const [lastMessageData, setLastMessageData] = useState<any>(null)

  useEffect(() => {
    if (inView && !lastMessageData) {
      setIsLoading(true)
      get
        .getLastEmails([data.contact_id])
        .then((res) => {
          const lastMessageResponse = getLastMessage(res[data.contact_id])
          const contactLastMessage = formatLastMessage(lastMessageResponse)
          setLastMessageData(contactLastMessage)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log('getLastEmails err ==>', err)
          setIsLoading(false)
        })
    }
  }, [data.contact_id, inView, lastMessageData])

  return (
    <div ref={ref} className={classnames(s.container, className)}>
      {isLoading ? (
        <LoaderStatic className={s.messageLoader} />
      ) : (
        <>
          <div className={s.lastData}>
            {lastMessageData && formatDate(lastMessageData.last_client_time)}
          </div>
          <div>{lastMessageData?.last_contact_message_text}</div>
        </>
      )}
    </div>
  )
}

const s = css`
  .container {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .messageLoader {
    width: 50px;
    height: 50px;
  }

  .lastData {
    margin-bottom: 6px;

    font-size: 12px;
    line-height: 14px;
    color: #adadad;
  }
`

export default CellLastMessage
