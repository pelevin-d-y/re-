import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePinned } from 'src/components/context/PinnedContext'
import { getName } from 'src/helpers/utils/get-name'
import { get } from 'src/api/requests'
import getLastMessage from 'src/helpers/utils/get-last-message'
import formatLastMessage from 'src/helpers/utils/format-last-message'
import { formatDistanceToNowStrict } from 'date-fns'
import CardContainer from '../cards/CardContainer'
import Avatar from '../Avatar'
import CloseButton from '../Close'
import PopoverUserInfo from '../popover/PopoverUserInfo'
import { LoaderAbsolute } from '../Loader'
import Typography from '../Typography'

type Props = {
  className?: string
  data: FormattedContact
}

const PinnedCard: React.FC<Props> = ({ className, data }) => {
  const { removePinned } = usePinned()
  const [loading, setIsLoading] = useState(false)
  const [lastMessageData, setLastMessageData] = useState<any>()

  const fetchLastEmail = async () => {
    await get
      .getLastEmails([data?.contact_id])
      .then((res) => {
        const lastMessageResponse = getLastMessage(res[data?.contact_id])
        const contactLastMessage = formatLastMessage(lastMessageResponse)
        setLastMessageData(contactLastMessage)
        setIsLoading(false)
      })
      .catch((err) => {
        if (err.response.status === 502) {
          fetchLastEmail()
        }
      })
  }

  useEffect(() => {
    fetchLastEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data ? (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar
        className={s.avatar}
        name={getName(data)}
        width={38}
        height={38}
        image={data.avatar}
      />
      <div className={s.info}>
        <div className={s.name}>
          <PopoverUserInfo data={data} position="top left" />
        </div>
        <Typography className={s.time} fontVariant="inter" styleVariant="body3">
          {lastMessageData?.last_client_time &&
            `Last Message ${formatDistanceToNowStrict(
              lastMessageData?.last_client_time
            )}`}
        </Typography>
      </div>
      {loading ? (
        <LoaderAbsolute />
      ) : (
        <CloseButton
          className={s.close}
          handler={() => {
            setIsLoading(true)
            removePinned(data.contact_id).finally(() => setIsLoading(false))
          }}
        />
      )}
    </CardContainer>
  ) : null
}

const s = css`
  .container {
    position: relative;

    box-shadow: 0px 1px 1px 0px #22222219;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 18px 50px 20px 20px;
    &:hover {
      .close {
        opacity: 1;
      }
    }
  }

  .avatar {
    flex: 0 0 auto;
    margin-right: 14px;
  }

  .name {
    width: 100%;
    margin-bottom: 5px;
    font-size: 12px;
    line-height: 14px;
  }

  .time {
    color: var(--neutral2);
  }

  .pin {
    position: absolute;
    top: 17px;
    right: 9px;

    margin-left: auto;
  }

  .checkbox {
    margin-right: 19px;
  }

  .close {
    position: absolute;
    opacity: 0;
    right: 20px;
    background: transparent;
  }
`

export default PinnedCard
