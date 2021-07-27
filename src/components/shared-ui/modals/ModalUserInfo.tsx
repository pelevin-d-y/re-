import React from 'react'
import classNames from 'classnames'
import Avatar from 'src/components/shared-ui/Avatar'
import parseMessage from 'src/helpers/utils/parse-message'
import { css } from 'astroturf'
import ModalLastMessage from './ModalLastMessage'
import UserHeader from '../UserHeader'

type Props = {
  className?: string
  data: UserData
}

const ModalUserInfo: React.FC<Props> = ({
  className,
  data: {
    avatar,
    name,
    templateData,
    last_contact_time: lastContactTime,
    last_contact_text: lastContactText,
    relationshipStrength,
  },
}) => {
  const parsedText = templateData && parseMessage(templateData.Summary, name)
  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.info}>
          <Avatar strength={relationshipStrength} image={avatar || null} />
          <div className={s.profileInfo}>
            <div className={s.name}>{name || '<unknown>'}</div>
            <div className={s.profileType}>Founder at Company X</div>
          </div>
        </div>
        <ModalLastMessage
          className={s.lastMessage}
          lastContactTime={lastContactTime}
          lastContactText={lastContactText}
        />
      </div>
      {parsedText && <UserHeader className={s.summary} text={parsedText} />}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

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

  .profileInfo {
    margin-left: 19px;
  }

  .name {
    margin-bottom: 6px;

    font-weight: var(--bold);
    font-size: 18px;
    line-height: 21px;
  }

  .summary {
    display: inline-block;
    width: auto;
    padding: 11px 17px 13px;
    margin-top: 17px;

    font-size: 12px;

    @include mobile {
      max-width: 300px;
    }
  }

  .lastMessage {
    max-width: 50%;
    width: 100%;

    @include mobile {
      max-width: 300px;
    }
  }
`

export default ModalUserInfo
