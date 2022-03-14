import React from 'react'
import Popup from 'reactjs-popup'

type Props = {
  isOpen: boolean
  className?: string
  styles?: React.CSSProperties
}

const ModalBase: React.FC<Props> = ({ children, isOpen, styles }) => {
  const overlayStyle = {
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const contentStyle = {
    width: '100%',
    maxHeight: 'calc(100vh - 2rem)',
    background: '#FFFFFF',
    overflow: 'auto',
    inset: 'auto',
  }

  return (
    <Popup
      nested
      modal
      open={isOpen}
      {...{ overlayStyle }}
      contentStyle={{ ...contentStyle, ...styles }}
    >
      {children}
    </Popup>
  )
}

export default ModalBase
