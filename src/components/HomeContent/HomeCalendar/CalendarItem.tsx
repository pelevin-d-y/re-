import React from 'react'
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
      <Pin className={s.pin} data={data as any} />
      <div className={s.profile}>
        <Avatar className={s.avatar} name={getName(data)} image={data.avatar} />
        <div className={s.text}>
          <PopoverUserInfo
            data={data}
            updateDataCallback={updateDataCallback}
          />
        </div>
      </div>
      <div className={s.message}>
        <NextStep text={getNextStep(data)} />
      </div>
      <Button className={s.button} variant="outlined" handler={buttonHandler}>
        Follow up
      </Button>
      {/* <PopoverRate
        className={s.button}
        buttonClickHandler={buttonHandler}
        variant="outlined"
      >
        Reach out
      </PopoverRate> */}
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
    margin-right: 9%;
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
    margin-bottom: 4px;
    font-weight: var(--bold);
    line-height: 16px;
  }
  .email {
    margin-bottom: 4px;
    line-height: 16px;
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
    margin-right: 20px;
    @include mobile {
      max-width: 100%;
    }
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
  }
`

export default CalendarItem
