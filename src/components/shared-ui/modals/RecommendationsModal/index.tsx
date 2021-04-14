import React, { useState, useEffect, MouseEvent } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import Search from 'src/components/shared-ui/Search'
import Button from 'src/components/shared-ui/Button'
import Avatar from 'src/components/shared-ui/Avatar'
import classNames from 'classnames'
import { users as testUsers, playlists } from 'src/testData'
import ModalBase from '../ModalBase'
import ModalClose from '../ModalClose'

const MultiEmailsModal: React.FC = () => {
  const { toggleRecommendationPopup, state } = usePopup()
  const { recommendationsIsOpen } = state
  const { state: users } = useUsers()
  const { data: usersData } = users

  const closeHandler = () => {
    toggleRecommendationPopup()
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={recommendationsIsOpen}
      onClose={closeHandler}
    >
      <div className={s.sidebar}>{playlists.map((item) => item)}</div>
      <div className={s.content}>{testUsers.map((item) => item.name)}</div>
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 1055px;
    display: grid;
    grid-template-columns: 2fr 4fr;
  }

  .sidebar {
    border-right: 1px solid #d0d0d0;
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .content {
    padding: 29px 30px 0;
  }
`

export default MultiEmailsModal
