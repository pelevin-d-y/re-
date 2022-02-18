import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { usePopup } from 'src/components/context/PopupContext'
import { useClient } from 'src/components/context/ClientContext'
import { useRouter } from 'next/router'
import TaskCard from './TaskCard'
import Typography from '../../Typography'

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
      <Typography className={s.title} fontVariant="damion">
        Onboarding Tasks
      </Typography>
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
    margin-left: -9px;
  }
`

export default OnboardingTasks
