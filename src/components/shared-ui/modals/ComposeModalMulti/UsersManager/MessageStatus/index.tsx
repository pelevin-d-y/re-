import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

import { formatDistance } from 'date-fns'
import Typography from 'src/components/shared-ui/Typography'

type Props = {
  className?: string
  data: any
}

const MessageStatus: React.FC<Props> = ({ className, data }) => {
  return (
    <div className={classNames(className, s.container)}>
      {data?.last_client_time && (
        <Typography className={s.date} fontVariant="inter" styleVariant="body3">
          Last Message{' '}
          {formatDistance(data?.last_client_time, new Date(), {
            addSuffix: true,
          })}
        </Typography>
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
    color: var(--primary1);
  }

  .image {
    width: 26px;
    height: 19px;
    object-fit: contain;
  }
`

export default MessageStatus
