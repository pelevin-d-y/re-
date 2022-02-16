import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import { useClient } from 'src/components/context/ClientContext'
import { usePopup } from 'src/components/context/PopupContext'
import Task from './Task'

type Props = {
  className?: string
}

const OnboardingTasks: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const { state: clientState } = useClient()
  const { dispatch: dispatchPopup } = usePopup()

  const accounts = useMemo(
    () =>
      clientState.data?.authData
        ? Object.entries(clientState.data.authData).length
        : 0,
    [clientState?.data?.authData]
  )

  const redirectToList = () => {
    router.push('/lists')
  }

  const openAddAccountModal = () => {
    if (accounts === 0) {
      dispatchPopup({ type: 'TOGGLE_ADD_FIRST_ACCOUNT_POPUP' })
    } else {
      dispatchPopup({ type: 'TOGGLE_ADD_NEW_ACCOUNT_POPUP' })
    }
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.title}>Onboarding Tasks</div>
      <div className={s.tasks}>
        {accounts !== 0 && (
          <Task
            img="list-circled.png"
            className={s.task}
            handler={redirectToList}
          >
            Create first list
          </Task>
        )}

        <Task
          img="email-strata.png"
          className={s.task}
          handler={openAddAccountModal}
        >
          Connect Account
        </Task>

        <Task img="logo-user-info.svg" className={s.task}>
          Share Strata
        </Task>
      </div>
    </div>
  )
}

const s = css`
  .container {
    background-color: var(--lightBlue);
    margin: 12px -21px 28px -12px;
    padding: 12px 21px 28px 12px;
  }

  .title {
    margin-bottom: 19px;

    font-weight: var(--semiBold);
    color: var(--neutral1);
  }

  .tasks {
    overflow: auto;

    display: flex;
    flex-flow: row nowrap;
    padding-bottom: 5px;
    padding-right: 2px;
  }

  .task {
    margin-left: 3%;
    width: calc(99% / 3);
  }
`

export default OnboardingTasks
