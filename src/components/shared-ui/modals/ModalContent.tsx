import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import ModalSent from './ModalSent'
import MessageManager from './MessageManager'
import ModalUserInfo from './ModalUserInfo'

type Props = {
  className?: string
  data: UserData | FormattedContact
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

  .footer {
    margin-top: 29px;
  }
`

export default ModalContent
