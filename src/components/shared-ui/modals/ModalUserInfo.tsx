import React from 'react'
import classNames from 'classnames'
import Avatar from 'src/components/shared-ui/Avatar'

import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import { getName } from 'src/helpers/utils/get-name'
import { formatDate } from 'src/helpers/utils/parseTime'
import { HOCLastMessage } from 'src/components/HOCs/HOCLastMessage'
import MessageStatus from './ComposeModalMulti/UsersManager/MessageStatus'
import ModalLastMessage from './ModalLastMessage'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
}

const ModalUserInfo: React.FC<Props> = ({ className, data }) => {
  const getAvatarUrl = () => {
    if ('avatar' in data) {
      return data.avatar
    }
    if ('image_url' in data) {
      return data.image_url
    }
    return null
  }

  const parsedTime = (lastMessageData: any) => {
    if (lastMessageData?.last_client_time) {
      return formatDate(lastMessageData.last_client_time)
    }
    return null
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.info}>
          <Avatar className={s.avatar} image={getAvatarUrl()} />
          <div className={s.userInfo}>
            <div className={s.userName}>{getName(data)}</div>
            <MessageStatus className={s.messageStatus} data={data} />
          </div>
        </div>

        <div className={s.bodyContainer}>
          <HOCLastMessage id={data.contact_id} delay={0}>
            {(lastMessageData, isLoading, ref) => {
              return (
                <>
                  <div className={s.subject}>{parsedTime(lastMessageData)}</div>
                  <ModalLastMessage
                    className={s.body}
                    lastMessageData={lastMessageData}
                    ref={ref}
                    isLoading={isLoading}
                  />
                </>
              )
            }}
          </HOCLastMessage>
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
    border: 1px solid #e6e6e6;
    border-radius: 5.9845px;
    padding: 18px 25px;

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

  .userName {
    margin-bottom: 3px;

    font-size: 12px;
    font-weight: var(--bold);

    @include mobile {
      margin-right: 10px;
    }
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
    min-width: 50%;
    max-width: 50%;
    width: 100%;
    padding: 15px 21px;

    border: 1px solid #dddddd;
    border-radius: 6px;
    font-size: 12px;
    line-height: 14px;

    @include mobile {
      min-width: 300px;
    }
  }

  .bodyContainer {
    max-width: 320px;
    width: 100%;
    background: #fafafa;
    border: 1px solid #dddddd;
    border-radius: 6px;
    font-size: 12px;
    line-height: 14px;
    overflow: auto;
  }

  .subject {
    max-height: 100px;
    padding: 8px 15px 0px 15px;
    font-weight: var(--bold);
  }

  .body {
    max-height: 100px;
    padding: 2px 15px 12px 15px;
  }
`

export default ModalUserInfo
