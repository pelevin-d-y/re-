import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { usePopup } from 'src/components/context/PopupContext'
import { useClient } from 'src/components/context/ClientContext'
import { useRouter } from 'next/router'
import TaskCard from './TaskCard'

type OnboardingTasksProps = {
  className?: string
}

const OnboardingTasks: React.FC<OnboardingTasksProps> = ({ className }) => {
  const { state: playlistsState } = usePlaylists()
  const { state: clientState } = useClient()

  const router = useRouter()

  const { dispatch: popupDispatch } = usePopup()

  const toggleCreateListModal = () => {
    popupDispatch({ type: 'TOGGLE_CREATE_LIST_POPUP' })
  }

  const openPersonalizationPage = () => {
    router.push(`/personalization`)
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.title}>Onboarding Tasks</div>
      <div className={s.tasks}>
        {playlistsState?.data?.length === 0 && (
          <TaskCard
            title="Create first list"
            icon="lists"
            handler={toggleCreateListModal}
          />
        )}
        {!clientState?.data?.authData && (
          <TaskCard
            title="Connect Account"
            icon="google-mail"
            handler={openPersonalizationPage}
          />
        )}
        <TaskCard
          title="Shared Strata"
          icon="logo-icon"
          // eslint-disable-next-line no-console
          handler={() => console.log('task')}
        />
      </div>
    </div>
  )
}

const s = css`
  .container {
    padding: 14px 23px 17px;
    background: #f0f5ff;
  }

  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #111212;
    margin-bottom: 13px;
  }

  .tasks {
    overflow: scroll;
    display: flex;
    flex-flow: row nowrap;
    margin-left: -9px;
    padding-bottom: 5px;
  }
`

export default OnboardingTasks
