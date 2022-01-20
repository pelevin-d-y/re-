import React, { useMemo, useState } from 'react'
import { css } from 'astroturf'
import CardTextContent from 'src/components/shared-ui/cards/CardTextContent'
import CardShare from 'src/components/shared-ui/cards/CardShareLink'
import CardShareSmall from 'src/components/shared-ui/cards/CardShareSmall'
import HomeSidebar from 'src/components/HomeContent/HomeSidebar'
import Grid from 'src/components/shared-ui/CardGrid'
import { useClient } from 'src/components/context/ClientContext'
import CardContact from 'src/components/shared-ui/cards/CardContact'
import { arrayIsEmpty } from 'src/helpers/utils/array-is-empty'
import HomeUpcoming from './HomeUpcoming'
import CardShareMulti from '../shared-ui/cards/CardShareMulti'
import { LoaderPage } from '../shared-ui/Loader'
import Recommendations from './Recommendations'
import EmptyRecommendations from '../shared-ui/EmptyRecommendations'

const Content: React.FC = () => {
  const { state: clientState } = useClient()
  const contacts = useMemo(
    () => clientState.data?.contacts,
    [clientState.data?.contacts]
  )

  const headerDataWeek = {
    month: 'sep',
    day: '9',
    title: 'Follow up with people you met with last week',
    description: '',
  }

  const shareHolidays = useMemo(
    () => ({
      title: 'Share Holiday',
      slides: ['share-hol-1.jpeg', 'share-hol-2.jpeg', 'share-hol-3.jpeg'],
      contacts: contacts?.slice(1, 4) as RecommendationUser[],
    }),
    [contacts]
  )

  const shareMemes = useMemo(
    () => ({
      title: 'Share Meme',
      slides: ['share-meme1.jpeg', 'share-meme2.jpeg', 'share-meme3.jpeg'],
      contacts: contacts?.slice(1, 4) as RecommendationUser[],
    }),
    [contacts]
  )

  const HomeUpcomingContacts = contacts?.slice(0, 4)

  const filteredStatusContacts = contacts?.filter(
    (contact: RecommendationUser) => contact.Status !== 'Declined'
  )

  const renderRecommendations = () =>
    filteredStatusContacts && !arrayIsEmpty(filteredStatusContacts) ? (
      <Recommendations
        className={s.section}
        data={filteredStatusContacts?.slice(0, 3)}
      />
    ) : (
      <EmptyRecommendations className={s.section} />
    )

  const renderCalendar = () =>
    HomeUpcomingContacts && !arrayIsEmpty(HomeUpcomingContacts) ? (
      <HomeUpcoming
        className={s.section}
        headerData={headerDataWeek}
        contacts={HomeUpcomingContacts}
      />
    ) : (
      <CardShare
        className={s.shareCard}
        variant="dark"
        image="banner-email@2x.png"
        event="Share Strata"
        title="Sharing is Caring"
        link="bit.ly/share-strata/hailey"
      />
    )

  return (
    <div className={s.container}>
      <div className={s.main}>
        {!clientState.isLoading ? (
          <>
            {renderRecommendations()}
            {renderCalendar()}
            <Grid className={s.section} division={2}>
              {shareHolidays.contacts && (
                <CardShareMulti data={shareHolidays} />
              )}
              {shareMemes.contacts && <CardShareMulti data={shareMemes} />}
            </Grid>

            {/* <Grid className={s.section} division={2}>
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
                <CardContact data={contacts[2]} />
                <CardContact data={contacts[3]} />
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
                image="share-meme1.jpeg"
                users={contacts?.slice(1, 4)}
              />
            </Grid>
            {contacts && (
              <Grid className={s.section} division={2}>
                <Grid division={2} direction="Row">
                  <CardContact data={contacts[6]} />
                  <CardContact data={contacts[5]} />
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
                  <CardContact data={contacts[2]} />
                  <CardContact data={contacts[3]} />
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
            </Grid> */}
          </>
        ) : (
          <LoaderPage />
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

  .shareCard {
    margin-bottom: 13px;
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
    z-index: 1;
    @include tablet {
      display: none;
    }
  }

  .cards {
    margin-top: 12px;
  }
`

export default Content
