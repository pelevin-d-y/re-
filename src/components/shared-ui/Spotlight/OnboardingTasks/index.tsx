import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import { usePopup } from 'src/components/context/PopupContext'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { useFreeStorage } from 'src/components/context/FreeStorageContext'
import { useRouter } from 'next/router'
import Task from './Task'
import Typography from '../../Typography'

type Props = {
  className?: string
}

const OnboardingTasks: React.FC<Props> = ({ className }) => {
  const { state: playlistsState } = usePlaylists()
  const { state: clientState } = useClient()

  const router = useRouter()

  const { dispatch: popupDispatch } = usePopup()
  const { updateFreeStorage } = useFreeStorage()

  const accounts = useMemo(
    () =>
      clientState.data?.authData
        ? Object.entries(clientState.data.authData).length
        : 0,
    [clientState?.data?.authData]
  )

  const statusAccounts = useMemo(
    () =>
      clientState.data?.authData
        ? Object.values(clientState.data.authData)
        : [],
    [clientState?.data?.authData]
  )

  const userHasNoList = useMemo(
    () =>
      playlistsState?.data?.length ? playlistsState?.data?.length === 0 : true,
    [playlistsState?.data]
  )

  const userHasAccount = useMemo(
    () => (accounts ? accounts > 0 : false),
    [accounts]
  )

  const userHasSyncedAccount = useMemo(
    () => statusAccounts.some((status) => status === 2),
    [statusAccounts]
  )

  const toggleCreateListModal = () => {
    popupDispatch({ type: 'TOGGLE_CREATE_LIST_POPUP' })
  }

  const openAddAccountModal = () => {
    if (accounts === 0) {
      popupDispatch({ type: 'TOGGLE_ADD_FIRST_ACCOUNT_POPUP' })
    } else {
      popupDispatch({ type: 'TOGGLE_ADD_NEW_ACCOUNT_POPUP' })
    }
  }

  const launchProductTour = () => {
    updateFreeStorage({ product_tour_shown: false })
    router.push('/')
  }

  return (
    <div className={classNames(className, s.container)}>
      <Typography className={s.title} fontVariant="damion">
        Onboarding Tasks
      </Typography>
      <div className={s.tasks}>
        {userHasAccount && userHasNoList && (
          <Task
            title="Create first list"
            img="list-circled.png"
            className={s.task}
            handler={toggleCreateListModal}
          />
        )}

        {!userHasSyncedAccount && (
          <Task
            title="Connect Account"
            img="email-strata.png"
            className={s.task}
            handler={openAddAccountModal}
          />
        )}

        <Task
          title="Share Strata"
          img="logo-user-info.svg"
          className={s.task}
        />

        <Task
          title="Product Tour"
          img="flag.svg"
          className={s.task}
          handler={launchProductTour}
        />
      </div>
    </div>
  )
}

const s = css`
  .container {
    padding: 14px 23px 12px;
    background: var(--secondary2);
  }

  .title {
    font-size: 24px;
    line-height: 33px;
    color: #812557;
    margin-bottom: 15px;
  }

  .tasks {
    overflow: scroll;
    display: flex;
    flex-flow: row nowrap;

    margin-left: -23px;
    margin-right: -23px;

    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 20px;
  }

  .task {
    margin-left: 3%;
    width: calc(90% / 3);
    min-width: 92px;
  }
`

export default OnboardingTasks
