import React, { useEffect, useMemo, useState } from 'react'
import Joyride, { Step } from 'react-joyride'
import { useFreeStorage } from 'src/components/context/FreeStorageContext'
import { useClient } from 'src/components/context/ClientContext'
import Typography from '../shared-ui/Typography'

type Props = {
  className?: string
}

const buttonsText = {
  last: 'Done',
}

const steps: Step[] = [
  {
    target: '.recommendations-welcome',
    placement: 'top',
    disableBeacon: true,
    content: (
      <>
        <Typography
          style={{ marginBottom: '8px' }}
          styleVariant="h1"
          fontVariant="damion"
        >
          Here are your recommendations
        </Typography>
        <Typography fontVariant="inter" styleVariant="body1">
          This is where you get your weekly recommendations. Reaching out to
          these recommendations will boost your network score.
        </Typography>
      </>
    ),
  },
  {
    target: '.spotlight-welcome',
    placement: 'left',
    disableBeacon: true,
    content: (
      <>
        <Typography
          style={{ marginBottom: '8px' }}
          styleVariant="h1"
          fontVariant="damion"
        >
          Here’s is your Spotlight
        </Typography>
        <Typography fontVariant="inter" styleVariant="body1">
          Spotlight gives you an overview of your overall network health and
          metrics that gives your insight on how you’re performing.
        </Typography>
      </>
    ),
  },
  {
    target: '.pinned-welcome',
    placement: 'left',
    disableBeacon: true,
    content: (
      <>
        <Typography
          style={{ marginBottom: '8px' }}
          styleVariant="h1"
          fontVariant="damion"
        >
          Pinned Contacts
        </Typography>
        <Typography fontVariant="inter" styleVariant="body1">
          Pin your recommendations and contacts to save as a task for later or
          even create a list to organization a group of contacts for any
          particular task later.
        </Typography>
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
        <Typography
          style={{ marginBottom: '8px' }}
          styleVariant="h1"
          fontVariant="damion"
        >
          Home
        </Typography>
        <Typography fontVariant="inter" styleVariant="body1">
          Home houses your dashboard of your weekly recommendations, relevant
          past events, discover content to share as well as your spotlight
          overview
        </Typography>
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
        <Typography
          style={{ marginBottom: '8px' }}
          styleVariant="h1"
          fontVariant="damion"
        >
          List
        </Typography>
        <Typography fontVariant="inter" styleVariant="body1">
          This is where you can manage groups of contacts as a list to manage,
          share and vet through workflows
        </Typography>
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
        <Typography
          style={{ marginBottom: '8px' }}
          styleVariant="h1"
          fontVariant="damion"
        >
          Recommendations
        </Typography>
        <Typography fontVariant="inter" styleVariant="body1">
          You can view all your weekly recommendations here to manage. The more
          you act of these recommendation, the higher the network score. If you
          don’t like a recommendation, tell us why so we learn more about what
          you care about
        </Typography>
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
        <Typography
          style={{ marginBottom: '8px' }}
          styleVariant="h1"
          fontVariant="damion"
        >
          Personalization
        </Typography>
        <Typography fontVariant="inter" styleVariant="body1">
          Manage your account and weekly recommendations here
        </Typography>
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
    minWidth: '160px',
    border: '1px solid #fff',
    marginRight: '45%',
    background: '#FFFFFF',
    color: '#111212',
    marginBottom: '14px',
  },
  buttonSkip: {
    border: '1px solid #fff',
    borderRadius: 40,
    minWidth: '160px',
  },
  buttonClose: {
    display: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  tooltipContainer: {
    textAlign: 'left' as const,
  },
  tooltipFooter: {
    flexDirection: 'column-reverse' as const,
    alignItems: 'baseline',
  },
}

const ProductTour: React.FC<Props> = () => {
  const [runTour, setRunTour] = useState(false)
  const [hasTourLaunched, setHasTourLaunched] = useState(false)

  const { updateFreeStorage, state: freeStorageState } = useFreeStorage()
  const { state: clientState } = useClient()

  const { hasFreeStorageLoaded } = freeStorageState
  const { product_tour_shown } = freeStorageState
  const { welcome_questionnaire_shown } = freeStorageState
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
    if (
      hasFreeStorageLoaded &&
      !isLoading &&
      isSynced &&
      !hasTourLaunched &&
      !product_tour_shown &&
      welcome_questionnaire_shown
    ) {
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
    welcome_questionnaire_shown,
    hasFreeStorageLoaded,
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
