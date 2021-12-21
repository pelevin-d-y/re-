import React from 'react'
import classNames from 'classnames'
import Avatar from 'src/components/shared-ui/Avatar'
import PopoverThread from 'src/components/shared-ui/popover/PopoverThread'
import parseMessage from 'src/helpers/utils/parse-message'
import { css } from 'astroturf'
import { formatTime } from 'src/helpers/utils/parseTime'
import { TagUser } from 'src/components/shared-ui/Tags'

type Props = {
  className?: string
  data: UserData | FormattedContact
  withAvatar?: boolean
}

const ModalUserInfo: React.FC<Props> = ({ className, data, withAvatar }) => {
  const { avatar, name } = data

  const parsedText = () => {
    if ('templateData' in data && data?.templateData) {
      return parseMessage(data.templateData.Subject, name)
    }
    return ''
  }

  const lastContactTime = () => {
    if ('last_contact_time' in data) {
      return formatTime(data.last_contact_time)
    }
    return ''
  }
  const userName = name

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.info}>
          {withAvatar && (
            <Avatar
              className={s.avatar}
              strength={
                'relationshipStrength' in data
                  ? data.relationshipStrength
                  : undefined
              }
              image={avatar || null}
            />
          )}
          <div className={s.profileInfo}>
            <div className={s.name}>{userName}</div>
            <TagUser text="Old friends" />
            <div className={s.lastMessageDate}>
              Last Message {lastContactTime()}{' '}
              <span className={s.thread}>View</span>
            </div>
          </div>
        </div>
        <div className={s.lastMessage}>
          <div
            className={s.message}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: parsedText(),
            }}
          />
        </div>
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;

    @include mobile {
      flex-flow: column nowrap;
    }
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;

    @include mobile {
      margin-bottom: 10px;
    }
  }

  .info {
    display: flex;
    flex-flow: row nowrap;
  }

  .avatar {
    margin-right: 19px;
  }

  .tag {
    font-size: 11px;
    line-height: 13px;
  }

  .name {
    margin-bottom: 8px;

    font-weight: var(--bold);
    font-size: 16px;
    line-height: 19px;
  }

  .lastMessageDate {
    display: flex;
    flex-flow: row wrap;
    align-items: baseline;
    margin-top: 7px;

    font-size: 12px;
    line-height: 14px;
  }

  .thread {
    margin-left: 8px;
    color: var(--blue);
    cursor: pointer;
  }

  .lastMessage {
    max-width: 50%;
    width: 100%;
    padding: 15px 21px;

    border: 1px solid #dddddd;
    border-radius: 6px;
    font-size: 12px;
    line-height: 14px;

    @include mobile {
      max-width: 300px;
    }
  }
`

export default ModalUserInfo
