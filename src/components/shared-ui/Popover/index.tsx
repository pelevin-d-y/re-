import React from 'react'
import dynamic from 'next/dynamic'
import { css } from 'astroturf'

const DynamicPopup = dynamic(() => import('reactjs-popup'), { ssr: false })

interface Props {
  triggerElement: JSX.Element
  popupContent: JSX.Element
}

const Popover: React.FC<Props> = ({ triggerElement, popupContent }) => (
  <DynamicPopup
    trigger={triggerElement}
    position="bottom center"
    closeOnDocumentClick
    on="hover"
  >
    {popupContent}
  </DynamicPopup>
)

const s = css`
  .link {
  }
`

export default Popover
