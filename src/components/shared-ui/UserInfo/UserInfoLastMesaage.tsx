import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { formatDate } from 'src/helpers/utils/parseTime'
import parseMessage from 'src/helpers/utils/parse-message'
import { LoaderStatic } from '../Loader'
import Typography from '../Typography'

type Props = {
  className?: string
  data?: any
  isLoading: boolean
}

const UserInfoLastMesaage = React.forwardRef<any, Props>(
  ({ className, data, isLoading }, ref) => {
    const parsedText = () => {
      if (data?.last_contact_message_text) {
        return parseMessage(data.last_contact_message_text)
      }
      return 'Last message is not defined'
    }

    return (
      <div ref={ref} className={classNames(className, s.container)}>
        {isLoading ? (
          <LoaderStatic className={s.messageLoader} />
        ) : (
          data && (
            <>
              <Typography
                tagVariant="div"
                styleVariant="body2"
                className={s.date}
              >
                {formatDate(data?.last_client_time)}
              </Typography>
              <div
                className={s.text}
                dangerouslySetInnerHTML={{ __html: parsedText() }}
              />
            </>
          )
        )}
      </div>
    )
  }
)

const s = css`
  .container {
    padding: 16px;
    border: 1px solid var(--neutral4);
    border-radius: 4px;
    line-height: 17px;
  }

  .date {
    color: var(--neutral2);
  }

  .text {
    overflow: hidden;
  }
`

export default UserInfoLastMesaage
