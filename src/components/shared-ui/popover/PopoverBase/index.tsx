import React from 'react'
import Popup from 'reactjs-popup'

type Props = {
  triggerElement: JSX.Element
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
    | 'top center'
    | 'bottom center'
    | 'center center'
    | 'right bottom'
}

const Popover: React.FC<Props> = ({
  triggerElement,
  popupContent,
  open,
  showPopupEvent,
  position,
}) => (
  <Popup
    trigger={triggerElement}
    position={position || 'bottom center'}
    closeOnDocumentClick
    on={showPopupEvent || 'hover'}
    open={open}
  >
    {popupContent}
  </Popup>
)

export default Popover
