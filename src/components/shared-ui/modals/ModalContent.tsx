import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import ModalSent from './ModalSent'
import MessageManager from './MessageManager'
import ModalUserInfo from './ModalUserInfo'
import CloseButton from '../Close'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
  closeHandler: () => void
  withAvatar?: boolean
  isSent?: boolean
}

const ModalContent: React.FC<Props> = ({
  className,
  data,
  closeHandler,
  withAvatar,
  isSent: messageIsSent,
}) => {
  const [isSent, setIsSent] = useState(messageIsSent || false)

  return isSent ? (
    <ModalSent handler={closeHandler} names={data.name || data.name} />
  ) : (
    <div className={classNames(className, s.container)}>
      <div className={s.closeContainer}>
        <div className={s.title}>Compose Message</div>
        <CloseButton className={s.buttonRemove} handler={closeHandler} />
      </div>
      <MessageManager
        data={data}
        setIsSent={(val: boolean) => setIsSent(val)}
      />
      <ModalUserInfo className={s.footer} data={data} withAvatar={withAvatar} />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 29px 30px;

    @include mobile {
      padding: 29px 16px;
    }
  }

  .closeContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .title {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
  }

  .buttonRemove {
    background: transparent;
    color: var(--neutral2);
  }

  .footer {
    margin-top: 29px;
  }
`

export default ModalContent
