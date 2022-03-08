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
import { format } from 'date-fns'
import Typography from 'src/components/shared-ui/Typography'
import Checkbox from 'src/components/shared-ui/Checkbox'
import { formatDateHideYear } from 'src/helpers/utils/parseTime'

type Props = {
  className?: string
  data: FormattedContact
  hideItemCallback?: () => void
  selectItemCallback?: (isChecked: boolean, contact_id: string) => void
  updateDataCallback?: () => void
}

const CalendarItem: React.FC<Props> = ({
  data,
  className,
  hideItemCallback,
  selectItemCallback,
  updateDataCallback,
}) => {
  const { dispatch } = usePopup()
  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }

  const [lastMessageData, setLastMessageData] = useState<any>(null)

  const fetchLastEmail = async () => {
    await get
      .getLastEmails([data.contact_id])
      .then((res) => {
        const lastMessageResponse = getLastMessage(res[data.contact_id])
        const contactLastMessage = formatLastMessage(lastMessageResponse)
        setLastMessageData(contactLastMessage)
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

  const selectItem = (isChecked: boolean) => {
    if (selectItemCallback) {
      selectItemCallback(isChecked, data.contact_id)
    }
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.profile}>
        <div className={s.avatarCheckbox}>
          <Checkbox
            id={data.contact_id}
            className={s.checkbox}
            handler={selectItem}
          />
          <Avatar
            className={s.avatar}
            name={getName(data)}
            image={data.avatar}
          />
        </div>
        <div className={s.text}>
          <PopoverUserInfo
            className={s.name}
            data={data}
            updateDataCallback={updateDataCallback}
          />
          {data.lastEvent?.info?.title && (
            <Typography
              className={s.meetingTitle}
              fontVariant="inter"
              styleVariant="body4"
            >
              {data.lastEvent.info.title}
            </Typography>
          )}
          {data.lastEvent?.start_time && (
            <Typography
              className={s.time}
              fontVariant="inter"
              styleVariant="body4"
            >
              {formatDateHideYear(data.lastEvent.start_time)}
            </Typography>
          )}
        </div>
      </div>
      <div className={s.message}>
        <NextStep className={s.nextStep} text={getNextStep(data)} />
      </div>

      <div className={s.actions}>
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
      </div>
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

  .avatarCheckbox {
    display: flex;
    align-items: center;
    justify-content: center;

    @include mobile {
      margin-bottom: 10px;
      margin-right: 45px;
    }
  }

  .meetingTitle {
    color: var(--black);
    margin-top: 4px;
    margin-bottom: 2px;
    @include mobile {
      text-align: center;
    }
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

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30%;

    @include mobile {
      margin-top: 12px;
    }
  }

  .button {
    margin-left: auto;
    max-width: 119px;
    width: 100%;

    @include mobile {
      margin-left: 12px;
      margin-right: 12px;
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

  .checkbox {
    margin-right: 16px;
  }

  .pin {
    margin-right: 11px;
  }

  .remove {
    background: var(--shades2);
    color: var(--neutral2);
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
