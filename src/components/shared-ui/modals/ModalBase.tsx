import React from 'react'
import Popup from 'reactjs-popup'

type Props = {
  isOpen: boolean
  className?: string
  styles?: React.CSSProperties
  onClose?: () => void
}

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

const ModalBase: React.FC<Props> = ({ children, isOpen, styles, onClose }) => {
  return (
    <Popup
      nested
      modal
      open={isOpen}
      {...{ overlayStyle }}
      onClose={onClose}
      contentStyle={{ ...contentStyle, ...styles }}
    >
      {children}
    </Popup>
  )
}

export default ModalBase
