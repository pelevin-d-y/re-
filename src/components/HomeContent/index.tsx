import React, { useMemo } from 'react'
import { css } from 'astroturf'
import CardItsBeen from 'src/components/shared-ui/cards/CardItsBeen'
import CardShare from 'src/components/shared-ui/cards/CardShare'
import { useLists } from 'src/components/context/ListsContext'
import CardShareSmall from 'src/components/shared-ui/cards/CardShareSmall'
import HomeSidebar from 'src/components/HomeContent/HomeSidebar'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Grid from 'src/components/shared-ui/Grid'
import { useClient } from 'src/components/context/ClientContext'
import CardSmall from 'src/components/shared-ui/cards/CardSmall'
import classNames from 'classnames'
import HomeRecommendations from './HomeRecommendations'
import HomeUpcoming from './HomeUpcoming'
import HomeMeeting from './HomeMeeting'
import HomeTripleCards from './HomeTripleCards'

const Content: React.FC = () => {
  const { state: lists } = useLists()
  const { state: clientState } = useClient()
  const contacts = useMemo(() => clientState?.contacts, [clientState?.contacts])

  return (
    <div className={s.container}>
      <div className={s.main}>
        {lists ? (
          <>
            <HomeRecommendations className={s.section} />
            <Grid className={s.section} division={2}>
              <CardItsBeen />
              <CardShareSmall />
            </Grid>
            {contacts && (
              <Grid className={s.section} division={2}>
                <CardSmall data={contacts[2]} isRow />
                <CardSmall data={contacts[3]} isRow />
              </Grid>
            )}
            <CardShare
              className={s.section}
              variant="dark"
              image={require('public/images/fintech.png')}
              event="James was mentioned on Techcrunch"
              title="Fintech Startup get acquired"
              link="https://slack.com/"
            />
            <Grid className={s.section} division={2}>
              <CardItsBeen />
              <CardShareSmall />
            </Grid>
            {contacts && (
              <Grid className={s.section} division={2}>
                <Grid division={2} direction="Row">
                  <CardSmall data={contacts[2]} isRow />
                  <CardSmall data={contacts[3]} isRow />
                </Grid>
                <CardItsBeen />
              </Grid>
            )}
            <HomeUpcoming
              data={lists?.find((list) => list.id === 6)}
              className={s.cards}
            />
            <CardShare
              className={s.cards}
              variant="light"
              image={require('public/images/fintech.png')}
              event="Celebrate this crazy holiday!"
              title="Share with your friends"
              link="https://www.google.com/"
            />
            <HomeMeeting
              data={lists?.find((list) => list.id === 9)}
              className={s.cards}
            />
            <HomeTripleCards className={s.cards} />
          </>
        ) : (
          <SvgIcon
            className={s.spinner}
            icon={require(`public/svg/spinner.svg?include`)}
          />
        )}
      </div>
      <HomeSidebar className={s.sidebar} />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    flex-flow: row nowrap;
    display: flex;
    padding: 10px 14px 14px;
  }

  .main {
    width: 70%;
    padding: 0 12px 12px 0;

    @include tablet {
      padding-right: 0;
      width: 100%;
    }
  }

  .section {
    margin-bottom: 13px;
  }

  .sidebar {
    @include tablet {
      display: none;
    }
  }

  .cards {
    margin-top: 12px;
  }

  .spinner {
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
`

export default Content
