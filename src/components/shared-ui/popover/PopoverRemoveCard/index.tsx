import React, { useState } from 'react'
import classNames from 'classnames'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import Close from 'src/components/shared-ui/Close'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import { random } from 'lodash'
import { post } from 'src/api'

type Props = {
  className?: string
  classRemove?: string
  data: UserData
}

const reasons = [
  {
    text: 'Not relevant',
  },
  {
    text: 'Not a good time',
  },
  {
    text: 'We spoke offline',
  },
  {
    text: 'Will reach out later',
  },
  {
    text: 'Never will contact',
  },
]

const PopoverRemoveCard: React.FC<Props> = ({
  className,
  classRemove,
  data,
}) => {
  const { updateUserData } = useClient()

  const [isOpen, setIsOpen] = useState(false)

  const closeHandler = () => {
    setIsOpen(false)

    post
      .postRecommendations({
        [data.address]: {
          Status: 'Declined',
          Notes: data?.Notes,
        },
      })
      .then(() => updateUserData())
      .catch((err) => console.log('postRecommendations err ==>', err))
  }

  return (
    <Popover
      position="bottom center"
      triggerElement={
        <div>
          <Close
            className={classRemove}
            handler={() => {
              setIsOpen(true)
            }}
          />
        </div>
      }
      open={isOpen}
      popupContent={
        <CardContainer className={classNames(className, s.popup)}>
          <div className={s.title}>
            <div className={s.titleText}>Ignore reason?</div>
            <Close handler={() => setIsOpen(false)} className={s.close} />
          </div>
          <div className={s.buttons}>
            {reasons.map((item) => (
              <button
                className={s.button}
                key={item.text}
                type="button"
                onClick={closeHandler}
              >
                {item.text}
              </button>
            ))}
          </div>
        </CardContainer>
      }
      showPopupEvent="click"
    />
  )
}

const s = css`
  .popup {
    padding: 22px 12px 10px 22px;
    margin-top: 5px;
    background: var(--white);
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 19px;
  }

  .titleText {
    font-weight: 800;
    font-size: 16px;
    line-height: 19px;
    margin-right: 62px;
  }

  .avatar {
    margin-bottom: 12px;
  }

  .name {
    margin-bottom: 6px;
    font-weight: var(--bold);
  }

  .description {
    max-width: 220px;
    margin-bottom: 14px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
  }

  .button {
    cursor: pointer;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;

    background-color: white;
    border: none;
    border-bottom: 1px solid #f6f6f6;
    margin-bottom: 7px;
    padding: 0 0 9px 0;
    text-align: start;

    &:hover {
      color: var(--blue);
    }
  }

  .buttonWithoutBorder {
    border-bottom: none;
  }
`

export default PopoverRemoveCard
