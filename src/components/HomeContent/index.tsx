import React, { useMemo } from 'react'
import { css } from 'astroturf'
import CardTextContent from 'src/components/shared-ui/cards/CardTextContent'
import CardShare from 'src/components/shared-ui/cards/CardShare'
import { useLists } from 'src/components/context/ListsContext'
import CardShareSmall from 'src/components/shared-ui/cards/CardShareSmall'
import HomeSidebar from 'src/components/HomeContent/HomeSidebar'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Grid from 'src/components/shared-ui/CardGrid'
import CardGuide from 'src/components/shared-ui/cards/CardGuide'
import { useClient } from 'src/components/context/ClientContext'
import CardContact from 'src/components/shared-ui/cards/CardContact'
import HomeRecommendations from './HomeRecommendations'
import CardRecommendations from '../shared-ui/cards/CardRecommendations'

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
              <CardTextContent
                title="It’s been"
                subtitle="Awhile..."
                description="It’s been awhile since you talked to these people. Check in on how they’re doing!"
                users={contacts?.slice(3, 8)}
              />
              <CardShareSmall
                title="Share Holiday"
                image="share-burger.jpeg"
                users={contacts?.slice(1, 4)}
              />
            </Grid>
            {/* <CardGuide className={s.section} /> */}
            <CardRecommendations 
              className={s.section}
            />
            <CardShare
              className={s.section}
              variant="dark"
              image="banner-email@2x.png"
              event="Share Strata"
              title="Sharing is Caring"
              link="bit.ly/share-strata/hailey"
            />
            {contacts && (
              <Grid className={s.section} division={2}>
                <CardContact data={contacts[2]} isRow />
                <CardContact data={contacts[3]} isRow />
              </Grid>
            )}
            <Grid className={s.section} division={2}>
              <CardTextContent
                title="Network"
                subtitle="Introductions"
                description="It’s been awhile since you talked to these people. Check in on how they’re doing!"
                users={contacts?.slice(1, 4)}
              />
              <CardShareSmall
                title="Share Meme"
                image="share-meme.jpeg"
                users={contacts?.slice(1, 4)}
              />
            </Grid>
            {contacts && (
              <Grid className={s.section} division={2}>
                <Grid division={2} direction="Row">
                  <CardContact data={contacts[6]} isRow />
                  <CardContact data={contacts[5]} isRow />
                </Grid>
                <CardTextContent
                  title="Followup"
                  subtitle="Investors"
                  description="It’s been awhile since you talked to these people. Check in on how they’re doing!"
                  users={contacts?.slice(4, 7)}
                />
              </Grid>
            )}
            {contacts && (
              <Grid className={s.section} division={2}>
                <CardTextContent
                  title="Network"
                  subtitle="Change Roles"
                  description="It’s been awhile since you talked to these people. Check in on how they’re doing!"
                  users={contacts?.slice(7, 12)}
                />
                <Grid division={2} direction="Row">
                  <CardContact data={contacts[2]} isRow />
                  <CardContact data={contacts[3]} isRow />
                </Grid>
              </Grid>
            )}
            <Grid className={s.section} division={2}>
              <CardShareSmall
                title="Share News"
                image="share-news1.jpeg"
                users={contacts?.slice(4, 9)}
              />
              <CardShareSmall
                title="Share News"
                image="share-news2.jpeg"
                users={contacts?.slice(9, 13)}
              />
            </Grid>
          </>
        ) : (
          <SvgIcon className={s.spinner} icon="spinner.svg" />
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
    color: var(--blue);
  }
`

export default Content
