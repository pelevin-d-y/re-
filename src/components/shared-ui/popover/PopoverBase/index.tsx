import React from 'react'
import dynamic from 'next/dynamic'

const DynamicPopup = dynamic(() => import('reactjs-popup'), { ssr: false })

type Props = {
  triggerElement: JSX.Element
  popupContent: JSX.Element
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
}

const Popover: React.FC<Props> = ({
  triggerElement,
  popupContent,
  showPopupEvent,
  position,
}) => (
  <DynamicPopup
    trigger={triggerElement}
    position={position || 'bottom center'}
    closeOnDocumentClick
    on={showPopupEvent || 'hover'}
  >
    {popupContent}
  </DynamicPopup>
)

export default Popover
