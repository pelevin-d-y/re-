import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import ModalSent from './ModalSent'
import MessageManager from './MessageManager'
import ModalUserInfo from './ModalUserInfo'

type Props = {
  className?: string
  data: UserData
  closeHandler: () => void
}

const ModalContent: React.FC<Props> = ({ className, data, closeHandler }) => {
  const [isSent, setIsSent] = useState(false)

  return isSent ? (
    <ModalSent handler={closeHandler} names={data.fullName || data.name} />
  ) : (
    <div className={classNames(className, s.container)}>
      <MessageManager
        data={data}
        setIsSent={(val: boolean) => setIsSent(val)}
      />
      <ModalUserInfo className={s.footer} data={data} withoutAvatar />
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
