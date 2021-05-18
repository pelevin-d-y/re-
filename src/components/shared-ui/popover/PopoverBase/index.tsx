import React from 'react'
import dynamic from 'next/dynamic'

const DynamicPopup = dynamic(() => import('reactjs-popup'), { ssr: false })

type Props = {
  triggerElement: JSX.Element
  popupContent: JSX.Element
}

const Popover: React.FC<Props> = ({ triggerElement, popupContent }) => (
  <DynamicPopup
    trigger={triggerElement}
    position="bottom center"
    closeOnDocumentClick
    on="click"
  >
    {popupContent}
  </DynamicPopup>
)

export default Popover
