import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import Avatar from 'src/components/shared-ui/Avatar'
import ModalBase from '../ModalBase'

type Props = {
  className?: string
}

const Ignore: React.FC<Props> = ({ className }) => {
  const { state: popupState, dispatch: modalDispatch } = usePopup()
  const { data } = popupState

  return (
    <ModalBase
      className={classNames(className, s.container)}
      isOpen={false}
      onClose={() => null}
    >
      <div className={s.title}>Ignore reason?</div>
      <Avatar />
    </ModalBase>
  )
}

const s = css`
  .container {
  }
`

export default Ignore
