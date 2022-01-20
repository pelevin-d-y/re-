import React from 'react'
import ReactModal from 'react-modal'
import { css } from 'astroturf'
import classNames from 'classnames'

type Props = {
  isOpen: boolean
  onClose: () => void
  className?: string
}

const EmailModal: React.FC<Props> = ({
  children,
  isOpen,
  onClose,
  className,
}) => {
  ReactModal.setAppElement('#__next')
  const modalStyles = {
    overlay: {
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.5)',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classNames(className, s.container)}
      style={modalStyles}
    >
      {children}
    </ReactModal>
  )
}

const s = css`
  .container {
    position: relative;
    width: 100%;
    max-height: calc(100vh - 2rem);
    min-height: 500px;
    background: var(--white);
    overflow: auto;
    inset: auto;
  }
`

export default EmailModal
