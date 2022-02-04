/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import classNames from 'classnames'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import { usePopup } from 'src/components/context/PopupContext'
import { css } from 'astroturf'
import { getName } from 'src/helpers/utils/get-name'
import { isNameEmail } from 'src/helpers/utils/is-name-email'
import PopupWithMutableData from './PopupWithMutableData'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
  updateDataCallback?: () => void
}

const PopoverUserInfo: React.FC<Props> = ({
  className,
  data,
  updateDataCallback,
}) => {
  const { dispatch } = usePopup()
  const [isOpen, setIsOpen] = useState(false)
  const buttonHandler = () => {
    setIsOpen(false)
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={(e: any) => e.stopPropagation()}>
      <Popover
        showPopupEvent="click"
        nested
        open={isOpen}
        onClose={() => setIsOpen(false)}
        triggerElement={
          <div className={classNames(className, s.trigger)}>
            <button
              type="button"
              className={classNames(
                s.triggerButton,
                isNameEmail(data) && s.triggerButtonEmail,
                !isNameEmail(data) && s.triggerButtonName
              )}
              onClick={() => setIsOpen(true)}
            >
              {getName(data)}
            </button>
          </div>
        }
        popupContent={
          <PopupWithMutableData
            data={data}
            buttonHandler={buttonHandler}
            updateDataCallback={updateDataCallback}
          />
        }
      />
    </div>
  )
}

const s = css`
  .triggerButton {
    padding: 0;
    margin: 0;
    background: none !important;
    border: none;
    cursor: pointer;
    font-weight: inherit;
    text-align: left;
  }

  .triggerButtonEmail {
    font-weight: normal;
  }

  .triggerButtonName {
    font-weight: bold;
  }
`
export default PopoverUserInfo
