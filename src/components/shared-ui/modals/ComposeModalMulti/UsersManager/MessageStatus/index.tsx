import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Img from 'src/components/shared-ui/Img'
import { parseDate } from 'src/helpers/utils/parseTime'
import { formatDistance } from 'date-fns'

type Props = {
  className?: string
  data: UserData | FormattedContacts
}

const MessageStatus: React.FC<Props> = ({ className, data }) => (
  <div className={classNames(className, s.container)}>
    {'last_contact_time' in data && data?.last_contact_time && (
      <div className={s.date}>
        {formatDistance(parseDate(data.last_contact_time), new Date(), {
          addSuffix: true,
        })}
      </div>
    )}
    {'isSent' in data && data?.isSent ? (
      <Img className={s.image} alt="sent" img="message-sent.png" />
    ) : (
      <SvgIcon className={s.icon} icon="message-default.svg" />
    )}
  </div>
)

const s = css`
  .container {
    font-size: 11px;
    line-height: 13px;
  }

  .date {
    margin-right: 15px;
  }

  .image {
    width: 26px;
    height: 19px;
    object-fit: contain;
  }
`

export default MessageStatus
