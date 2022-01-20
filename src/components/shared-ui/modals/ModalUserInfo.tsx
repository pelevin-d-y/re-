import React from 'react'
import classNames from 'classnames'
import Avatar from 'src/components/shared-ui/Avatar'

import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
  withAvatar?: boolean
}

const ModalUserInfo: React.FC<Props> = ({ className, data, withAvatar }) => {
  const parsedText = () => {
    if ('last_contact_message_text' in data) {
      return parseMessage(data?.last_contact_message_text)
    }
    return 'Last message is not defined'
  }

  const getAvatarUrl = () => {
    if ('avatar' in data) {
      return data.avatar
    }
    if ('image_url' in data) {
      return data.image_url
    }
    return null
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.info}>
          {withAvatar && <Avatar className={s.avatar} image={getAvatarUrl()} />}
          <div className={s.profileInfo}>
            <div className={s.name}>{data.name}</div>
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
