import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { formatDate } from 'src/helpers/utils/parseTime'
import { LoaderStatic } from '../Loader'

type Props = {
  className?: string
  lastMessageData?: any
  isLoading: boolean
}

const CellLastMessage = React.forwardRef<any, Props>(
  ({ className, isLoading, lastMessageData }, ref) => {
    return (
      <div ref={ref} className={classNames(s.container, className)}>
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
)

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
