import React, { useEffect, useMemo, useState } from 'react'
import Joyride, { Step } from 'react-joyride'
import { useFreeStorage } from 'src/components/context/FreeStorageContext'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
}

const buttonsText = {
  last: 'Done',
}

const steps: Step[] = [
  {
    target: '.recommendations-welcome',
    placement: 'bottom',
    disableBeacon: true,
    content: (
      <>
        <h2>Here are your recommendations</h2>
        <p>
          This is where you get your weekly recommendations. Reaching out to
          these recommendations will boost your network score.
        </p>
      </>
    ),
  },
  {
    target: '.spotlight-welcome',
    placement: 'left',
    disableBeacon: true,
    content: (
      <>
        <h2>Here’s is your Spotlight</h2>
        <p>
          Spotlight gives you an overview of your overall network health and
          metrics that gives your insight on how you’re performing.
        </p>
      </>
    ),
  },
  {
    target: '.pinned-welcome',
    placement: 'left',
    disableBeacon: true,
    content: (
      <>
        <h2>Pinned Contacts</h2>
        <p>
          Pin your recommendations and contacts to save as a task for later or
          even create a list to organization a group of contacts for any
          particular task later.
        </p>
      </>
    ),
  },
  {
    target: '.home-menu-welcome',
    placement: 'right',
    disableScrolling: true,
    disableBeacon: true,
    content: (
      <>
        <h2>Home</h2>
        <p>
          Home houses your dashboard of your weekly recommendations, relevant
          past events, discover content to share as well as your spotlight
          overview
        </p>
      </>
    ),
  },
  {
    target: '.lists-menu-welcome',
    placement: 'right',
    disableScrolling: true,
    disableBeacon: true,
    content: (
      <>
        <h2>List</h2>
        <p>
          This is where you can manage groups of contacts as a list to manage,
          share and vet through workflows
        </p>
      </>
    ),
  },
  {
    target: '.recommendations-menu-welcome',
    placement: 'right',
    disableScrolling: true,
    disableBeacon: true,
    content: (
      <>
        <h2>Recommendations</h2>
        <p>
          You can view all your weekly recommendations here to manage. The more
          you act of these recommendation, the higher the network score. If you
          don’t like a recommendation, tell us why so we learn more about what
          you care about
        </p>
      </>
    ),
  },
  {
    target: '.personalization-menu-welcome',
    placement: 'right',
    disableScrolling: true,
    disableBeacon: true,
    content: (
      <>
        <h2>Personalization</h2>
        <p>Manage your account and weekly recommendations here</p>
      </>
    ),
  },
]

const customStyle = {
  options: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    primaryColor: '#1966FF',
    textColor: '#fff',
    width: '500px',
  },
  buttonNext: {
    borderRadius: 40,
    paddingLeft: '40px',
    paddingRight: '40px',
    border: '1px solid #fff',
    marginRight: '38%',
  },
  buttonSkip: {
    marginLeft: '45%',
  },
  buttonClose: {
    display: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}

const ProductTour: React.FC<Props> = ({ className }) => {
  const [runTour, setRunTour] = useState(false)
  const [hasTourLaunched, setHasTourLaunched] = useState(false)

  const { updateFreeStorage, state: freeStorageState } = useFreeStorage()
  const { state: clientState } = useClient()

  const { product_tour_shown } = freeStorageState
  const { isLoading } = clientState

  const statusAccounts = useMemo(
    () =>
      clientState.data?.authData
        ? Object.values(clientState.data.authData)
        : [],
    [clientState?.data?.authData]
  )

  const isSynced = useMemo(
    () => statusAccounts.some((status) => status === 2),
    [statusAccounts]
  )

  useEffect(() => {
    if (!isLoading && !hasTourLaunched && !product_tour_shown && isSynced) {
      setHasTourLaunched(true)
      updateFreeStorage({ product_tour_shown: true })

      setTimeout(() => {
        setRunTour(true)
      }, 800)
    }
  }, [
    isLoading,
    hasTourLaunched,
    isSynced,
    product_tour_shown,
    updateFreeStorage,
  ])

  return (
    <div>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        scrollToFirstStep
        showSkipButton
        hideBackButton
        scrollOffset={420}
        scrollDuration={500}
        locale={buttonsText}
        styles={customStyle}
      />
    </div>
  )
}

export default ProductTour
