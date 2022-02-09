import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import { LoaderStatic } from '../Loader'

type Props = {
  className?: string
  isLoading: boolean
  lastMessageData?: any
}

const ModalLastMessage = React.forwardRef<any, Props>(
  ({ className, isLoading, lastMessageData }, ref) => {
    const parsedText = () => {
      if (lastMessageData?.last_contact_message_text) {
        return parseMessage(lastMessageData.last_contact_message_text)
      }
      return 'Last message is not defined'
    }

    return (
      <div className={classNames(className, s.container)} ref={ref}>
        {isLoading ? (
          <LoaderStatic className={s.loader} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: parsedText() }} />
        )}
      </div>
    )
  }
)

const s = css`
  .container {
  }

  .loader {
    width: 80px;
    height: 80px;
    color: #c9c8c8;
  }
`

export default ModalLastMessage
