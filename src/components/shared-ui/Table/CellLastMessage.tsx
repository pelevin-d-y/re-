import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { formatDate } from 'src/helpers/utils/parseTime'
import { LoaderStatic } from '../Loader'
import Typography from '../Typography'

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
            {lastMessageData && (
              <Typography
                tagVariant="div"
                styleVariant="body4"
                className={s.lastData}
              >
                {formatDate(lastMessageData.last_client_time)}
              </Typography>
            )}
            <Typography
              className={s.text}
              tagVariant="div"
              styleVariant="body4"
            >
              {lastMessageData?.last_contact_message_text}
            </Typography>
          </>
        )}
      </div>
    )
  }
)

const s = css`
  .container {
    padding: 8px;
    background: var(--neutral5);
    border-radius: 6px;
  }
  .messageLoader {
    width: 50px;
    height: 50px;
  }

  .lastData {
    margin-bottom: 6px;

    color: #adadad;
  }

  .text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

export default CellLastMessage
