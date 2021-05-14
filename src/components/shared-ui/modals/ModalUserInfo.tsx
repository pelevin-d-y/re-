import React from 'react'
import classNames from 'classnames'
import Avatar from 'src/components/shared-ui/Avatar'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import parseEmailMessage from 'src/helpers/utils/parse-email-message'
import { css } from 'astroturf'

type Props = {
  className?: string
  avatar?: string
  name?: string
  text: string
}

const ModalUserInfo: React.FC<Props> = ({ className, avatar, name, text }) => {
  const parsedText = parseEmailMessage(text, name)
  return (
    <div className={classNames(className, s.container)}>
      <div className={s.profile}>
        <Avatar image={avatar ? require(`public/images/${avatar}`) : null} />
        <div className={s.profileInfo}>
          <div className={s.name}>{name || '<unknown>'}</div>
          <div className={s.profileType}>
            <ColorfulCircle color="black" />
            Follow up on Meetings
          </div>
        </div>
      </div>
      {parsedText && <div className={s.info}>{parsedText}</div>}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
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

  .info {
    max-width: 30%;
    width: 100%;
    padding: 11px 17px 13px;
    font-size: 12px;

    background: #f8f8f8;

    @include mobile {
      max-width: 300px;
    }
  }
`

export default ModalUserInfo
