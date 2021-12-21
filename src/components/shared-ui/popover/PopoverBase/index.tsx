import React from 'react'
import Popup from 'reactjs-popup'

type Props = {
  triggerElement: JSX.Element | ((isOpen: boolean) => JSX.Element)
  popupContent: JSX.Element
  open?: boolean
  showPopupEvent?: 'hover' | 'click'
  position?:
    | 'top left'
    | 'top right'
    | 'bottom right'
    | 'bottom left'
    | 'right center'
    | 'left center'
    | 'left bottom'
    | 'top center'
    | 'bottom center'
    | 'center center'
    | 'right bottom'
  nested?: boolean
  onClose?: () => void
}

const Popover: React.FC<Props> = ({
  triggerElement,
  popupContent,
  open,
  showPopupEvent,
  position,
  nested,
  onClose
}) => (
  <Popup
    trigger={triggerElement}
    position={position || 'bottom center'}
    closeOnDocumentClick
    on={showPopupEvent || 'hover'}
    open={open}
    nested={nested}
    onClose={onClose}
  >
    {popupContent}
  </Popup>
)

export default Popover
