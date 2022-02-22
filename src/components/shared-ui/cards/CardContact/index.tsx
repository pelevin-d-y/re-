import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Pin from 'src/components/shared-ui/Pin'
import Avatar from 'src/components/shared-ui/Avatar'
import { usePopup } from 'src/components/context/PopupContext'

import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import NextStep from 'src/components/shared-ui/NextStep'
import Button from 'src/components/shared-ui/Button'
import PopoverRemoveCard from 'src/components/shared-ui/popover/PopoverRemoveCard'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns'
import { getName } from 'src/helpers/utils/get-name'

type Props = {
  className?: string
  data: RecommendationUser
  pin?: boolean
}

const CardContact: React.FC<Props> = ({ className, data, pin }) => {
  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <PopoverRemoveCard classRemove={s.remove} data={data} />
      <div className={classNames(s.rowUserInfo)}>
        <Avatar
          image={data.image_url}
          name={getName(data)}
          width={44}
          height={44}
          className={s.avatar}
        />
        <div className={classNames(s.userText)}>
          <PopoverUserInfo className={s.name} data={data} />
          <div className={s.time}>
            {formatDistanceToNowStrict(
              fromUnixTime(Number(data.last_contact_message_time)),
              { addSuffix: true }
            )}
          </div>
        </div>
      </div>
      <NextStep
        className={s.description}
        text={data.message_template_subject}
      />
      <div className={s.actions}>
        {pin && <Pin className={s.pin} data={data.contact_id} />}
        <Button
          className={s.button}
          variant="contained"
          handler={buttonHandler}
        >
          Follow Up
        </Button>
        {/* <PopoverActions
          buttonClickHandler={buttonHandler}
          className={s.button}
          variant="contained"
          isArrow
        >
          Follow Up
        </PopoverActions> */}
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    background: var(--shades2);

    width: 100%;
    padding: 14px 15px 14px 10px;

    &:hover {
      .remove {
        opacity: 1;
      }
    }
  }

  .remove {
    position: absolute;
    top: 5px;
    right: 5px;

    background: var(--shades2);
    color: #bfbfbf;

    opacity: 0;
  }

  .description {
    margin-bottom: 14px;
  }

  .actions {
    display: flex;
    flex-flow: row nowrap;
    margin-top: auto;
  }

  .button {
    width: 100%;
  }

  .name {
    margin-bottom: 10px;
    font-weight: var(--bold);
  }

  .pin {
    margin-right: 11px;
  }

  .rowUserInfo {
    display: flex;
    flex-flow: row nowrap;
    padding-top: 6px;
    margin-bottom: 20.5px;
  }

  .userText {
    width: 100%;
    padding-top: 6px;
    margin-left: 18px;
    padding-right: 20px;
  }

  .time {
    color: var(--neutral2);
    font-size: 11px;
    line-height: 13px;
  }
`

export default CardContact
