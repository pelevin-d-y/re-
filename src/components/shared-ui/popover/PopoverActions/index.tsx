import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import PopoverActionsContent from '../PopoverActionsContent'

type Props = {
  className?: string
  buttonClickHandler: () => void
  variant: 'outlined' | 'contained'
  isArrow?: boolean
}

const PopoverActions: React.FC<Props> = ({
  className,
  buttonClickHandler,
  variant,
  isArrow,
  children,
}) => (
  <Popover
    showPopupEvent="hover"
    triggerElement={
      <Button
        className={classNames(className, s.button)}
        variant={variant}
        isArrow={isArrow}
        handler={() => buttonClickHandler()}
      >
        {children}
      </Button>
    }
    popupContent={<PopoverActionsContent className={s.popup} />}
  />
)

const s = css`
  .popup {
    width: 175px !important;
  }

  .stars {
    margin-top: 6px;
  }

  .rate {
    padding: 9px 15px;
    font-weight: var(--bold);
  }
`

export default PopoverActions
