import React, { useState } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import Button from 'src/components/shared-ui/Button'
import CloseModal from '../../Close'
import ModalBase from '../ModalBase'

const CreateListModal: React.FC = () => {
  const { state } = usePopup()
  const { createListModalIsOpen } = state
  console.log('createListModalIsOpen', createListModalIsOpen)
  // const { name, event, avatar, templateData } = data

  const closeHandler = () => {
    console.log('close create list modal')
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={createListModalIsOpen}
      onClose={closeHandler}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.content}>create new list</div>
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    max-width: 900px;
  }
`

export default CreateListModal
