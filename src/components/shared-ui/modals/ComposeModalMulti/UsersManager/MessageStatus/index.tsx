import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

import { formatDistance } from 'date-fns'

type Props = {
  className?: string
  data: any
}

const MessageStatus: React.FC<Props> = ({ className, data }) => {
  return (
    <div className={classNames(className, s.container)}>
      {data?.last_client_time && (
        <div className={s.date}>
          Last Message{' '}
          {formatDistance(data?.last_client_time, new Date(), {
            addSuffix: true,
          })}
        </div>
      )}
      {/* {'isSent' in data && data?.isSent ? (
          <Img className={s.image} alt="sent" img="message-sent.png" />
        ) : (
          <SvgIcon className={s.icon} icon="message-default.svg" />
        )} */}
    </div>
  )
}

const s = css`
  .container {
    font-size: 11px;
    line-height: 13px;
  }

  .date {
    margin-right: 15px;
    white-space: nowrap;
  }

  .image {
    width: 26px;
    height: 19px;
    object-fit: contain;
  }
`

export default MessageStatus
