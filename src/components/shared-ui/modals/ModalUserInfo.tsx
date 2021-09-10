import React from 'react'
import classNames from 'classnames'
import Avatar from 'src/components/shared-ui/Avatar'
import PopoverThread from 'src/components/shared-ui/popover/PopoverThread'
import parseMessage from 'src/helpers/utils/parse-message'
import { css } from 'astroturf'
import UserHeader from '../UserHeader'

type Props = {
  className?: string
  data: any
}

const ModalUserInfo: React.FC<Props> = ({ className, data }) => {
  const { avatar, name, fullName, templateData, relationshipStrength } = data
  const parsedText = templateData && parseMessage(templateData.Subject, name)
  const userName = fullName || name
  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.info}>
          <Avatar strength={relationshipStrength} image={avatar || null} />
          <div className={s.profileInfo}>
            <div className={s.name}>{userName || '<unknown>'}</div>
            <div className={s.profileType}>Founder at Company X</div>
          </div>
        </div>
        <PopoverThread data={data} />
      </div>
      {parsedText && <UserHeader className={s.summary} text={parsedText} />}
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
