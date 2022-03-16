import React, { useMemo } from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classnames from 'classnames'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Img from 'src/components/shared-ui/Img'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { useClient } from 'src/components/context/ClientContext'
import OnboardingTasks from './OnboardingTasks'
import Typography from '../Typography'
import WeeklyOverview from './WeeklyOverview'

type Props = {
  className?: string
}

const Spotlight: React.FC<Props> = ({ className }) => {
  const { state: playlistsState } = usePlaylists()
  const { state: clientState } = useClient()

  const showOnboardingTasks = useMemo(
    () =>
      !playlistsState.isLoading &&
      !clientState.isLoading &&
      (true || playlistsState.data.length === 0 || clientState.data?.authData),
    [
      clientState.data?.authData,
      clientState.isLoading,
      playlistsState.data.length,
      playlistsState.isLoading,
    ]
  )

  return (
    <CardContainer
      className={classnames(className, s.container, 'spotlight-welcome')}
    >
      <div className={s.header}>
        <Typography className={s.title} fontVariant="damion">
          Spotlight
        </Typography>
        <Img className={s.underline} alt="" img="decorate-line-2.png" />
      </div>
      <div className={s.score}>
        <div className={s.left}>
          <Typography className={s.rating} fontVariant="inter">
            Great
          </Typography>
          <Typography className={s.ratingSubtitle} fontVariant="inter">
            You’re all good!
          </Typography>
        </div>
        <div className={s.right}>
          <div className={s.radar}>
            <SvgIcon icon="radar.svg" />
          </div>
          <Typography className={s.scoreTitle}>Network Score</Typography>
        </div>
      </div>
      {showOnboardingTasks && <OnboardingTasks />}
      <WeeklyOverview />
    </CardContainer>
  )
}

const s = css`
  .container {
  }

  .header {
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 22px 23px 0px;
  }

  .actions {
    margin-bottom: 9px;
  }

  .radar {
    margin-bottom: 10px;
  }

  .title {
    font-size: 32px;
    line-height: 44px;
  }

  .ratingSubtitle {
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: var(--primary1);
    text-align: center;
  }

  .score {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 11px 23px 30px 23px;
  }

  .scoreTitle {
    font-size: 12px;
    line-height: 15px;
    color: var(--black);
    text-align: center;
  }

  .right {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
  }

  .rating {
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    margin-bottom: 6px;
    color: var(--primary1);
  }

  .longCard {
    margin-bottom: 8px;
  }

  .wins {
    margin-top: 11px;
  }

  .underline {
    max-width: 135px;
  }
`

export default Spotlight
