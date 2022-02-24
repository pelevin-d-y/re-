import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Avatar from 'src/components/shared-ui/Avatar'
import { usePopup } from 'src/components/context/PopupContext'
import NextStep from 'src/components/shared-ui/NextStep'
import Button from 'src/components/shared-ui/Button'
import Pin from 'src/components/shared-ui/Pin'
import Close from 'src/components/shared-ui/Close'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import { getNextStep } from 'src/helpers/utils/get-next-step'
import { getName } from 'src/helpers/utils/get-name'
import getLastMessage from 'src/helpers/utils/get-last-message'
import formatLastMessage from 'src/helpers/utils/format-last-message'
import { get } from 'src/api/requests'
import { LoaderStatic } from 'src/components/shared-ui/Loader'
import { format } from 'date-fns'
import Typography from 'src/components/shared-ui/Typography'

type Props = {
  className?: string
  data: FormattedContact
  hideItemCallback?: () => void
  updateDataCallback?: () => void
}

const CalendarItem: React.FC<Props> = ({
  data,
  className,
  hideItemCallback,
  updateDataCallback,
}) => {
  const { dispatch } = usePopup()
  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }

  const [lastMessageData, setLastMessageData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchLastEmail = async () => {
    setIsLoading(true)
    await get
      .getLastEmails([data.contact_id])
      .then((res) => {
        const lastMessageResponse = getLastMessage(res[data.contact_id])
        const contactLastMessage = formatLastMessage(lastMessageResponse)
        setLastMessageData(contactLastMessage)
        setIsLoading(false)
      })
      .catch((err) => {
        if (err.response.status === 502) {
          fetchLastEmail()
        }
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchLastEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hideItem = () => {
    const { contact_id } = data
    const storageKey = 'hidden_contacts_calendar'
    const localHidden = JSON.parse(localStorage.getItem(storageKey) || '[]')

    const newHidden = {
      contact_id,
      time_hidden: Date.now(),
    }
    localHidden.push(newHidden)

    localStorage.setItem(storageKey, JSON.stringify(localHidden))

    if (hideItemCallback) {
      hideItemCallback()
    }
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.profile}>
        <Avatar className={s.avatar} name={getName(data)} image={data.avatar} />
        <div className={s.text}>
          <PopoverUserInfo
            className={s.name}
            data={data}
            updateDataCallback={updateDataCallback}
          />
          <Typography
            className={s.time}
            fontVariant="inter"
            styleVariant="body4"
          >
            {lastMessageData?.last_client_time &&
              format(lastMessageData?.last_client_time, 'EEEE LLL d, yyyy')}
          </Typography>
        </div>
      </div>
      <div className={s.message}>
        <NextStep className={s.nextStep} text={getNextStep(data)} />
      </div>
      <Pin className={s.pin} data={data.contact_id} />
      <Button className={s.button} variant="outlined" handler={buttonHandler}>
        Reach out
      </Button>
      <Close
        className={s.remove}
        handler={() => {
          hideItem()
        }}
      />
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px 22px 14px 17px;
    margin-bottom: 8px;

    @include mobile {
      flex-flow: column nowrap;
      padding: 14px 24px 18px 24px;
      max-width: 300px;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
    }
  }
  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    max-width: 250px;
    width: 100%;

    @include mobile {
      flex-flow: column nowrap;
      margin-right: 0;
    }
  }
  .avatar {
    margin-right: 26px;
    @include mobile {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
  .event {
    flex: 1 0 auto;
  }

  .name {
    margin-bottom: 3px;
    @include mobile {
      text-align: center;
    }
  }

  .text {
    overflow: hidden;
    max-width: 100%;
    word-break: break-all;
    margin-right: 10px;
  }

  .time {
    color: var(--primary1);
    @include mobile {
      text-align: center;
    }
  }

  .position {
    font-size: 12px;
    @include mobile {
      display: none;
    }
  }
  .button {
    margin-left: auto;
    max-width: 119px;
    width: 100%;
    @include mobile {
      margin-top: 12px;
      margin-left: 0;
    }
  }

  .message {
    max-width: 40%;
    width: 100%;
    word-break: break-word;
    margin-right: 20px;
    @include mobile {
      max-width: 100%;
    }
  }

  .nextStep {
    background-color: var(--neutral5);
  }

  .pin {
    margin-right: 11px;
  }

  .remove {
    background: var(--shades2);
    margin-left: 11px;
  }

  .container {
    .remove {
      opacity: 0;
    }

    &:hover {
      .remove {
        opacity: 0.6;
      }
    }

    @include tablet {
      .remove {
        opacity: 0.6;
      }
    }

    @include mobile {
      .text {
        margin-bottom: 10px;
      }

      .remove {
        margin: 0;
      }

      .pin {
        margin: 0;
      }

      .message {
        margin: 0;
      }
    }
  }
`

export default CalendarItem
