import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'
import { formatTime } from 'src/helpers/utils/parseTime'

type Props = {
  className?: string
  data: UserData
  clientName?: string
}

const ThreadItem: React.FC<Props> = ({ className, data }) => (
  <div className={classNames(s.container, className)}>
    <div className={s.header}>
      <div className={s.profile}>
        <Avatar className={s.avatar} image={data.avatar} />
        <div className={s.profileInfo}>
          <div className={classNames(s.name, s.profileItem)}>{data.name}</div>
          <div className={s.profileItem}>Re: Investor needed</div>
          <div className={s.profileItem}>To: Phil Hoyt</div>
        </div>
      </div>
      {data.last_contact_time && (
        <div className={s.date}>{formatTime(data.last_contact_time)}</div>
      )}
    </div>
    {data.last_client_text ? (
      <div
        className={s.message}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: data.last_client_text,
        }}
      />
    ) : (
      <div className={s.message}>last message not found</div>
    )}
  </div>
)

const s = css`
  .container {
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding: 11px 14px 12px 11px;

    border-bottom: 1px solid #dddddd;
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .avatar {
    margin-right: 13px;
  }

  .name {
    font-weight: var(--bold);
  }

  .profileInfo {
    font-size: 12px;
    line-height: 14px;
  }

  .profileItem {
    margin-bottom: 3px;
  }

  .date {
    font-size: 11px;
    line-height: 13px;
  }

  .message {
    padding: 18px 22px 11px 19px;
  }
`

export default ThreadItem
