import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { arrayIsEmpty } from 'src/helpers/utils/array-is-empty'
import { useDebounce } from 'use-debounce/lib'

import SectionHeader from '../shared-ui/SectionHeader'
import { useClient } from '../context/ClientContext'
import Search from '../shared-ui/Search'
import RecsTable from './RecsTable'
import { LoaderPage } from '../shared-ui/Loader'
import { TagRecs } from '../shared-ui/Tags'
import Button from '../shared-ui/Button'
import { usePopup } from '../context/PopupContext'
import EmptyRecommendations from '../shared-ui/EmptyRecommendations'

type Props = {
  className?: string
}

const tags = [
  'New York',
  'Investor',
  'Follow Up',
  'Pinned',
  'Been awhile',
  'Urgent',
]

const AllRecsContent: React.FC<Props> = ({ className }) => {
  const { state: clientState } = useClient()
  const { dispatch: popupDispatch } = usePopup()

  const [contacts, setContacts] = useState(clientState.data?.contacts)
  const [contactsDebounce] = useDebounce(contacts, 700)

  const toggleContactMulti = () => {
    popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  const toggleCreateListModal = () => {
    popupDispatch({ type: 'TOGGLE_CREATE_LIST_POPUP' })
  }

  const filterContacts = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (clientState.data?.contacts) {
      const allContacts = clientState.data.contacts
      const filteredContacts = allContacts.filter(
        (item) =>
          (item.name as string)
            .toLocaleLowerCase()
            .search(event.target.value.toLocaleLowerCase()) !== -1
      )

      setContacts(filteredContacts)
    }
  }

  useEffect(() => {
    setContacts(clientState.data?.contacts)
  }, [clientState.data?.contacts])

  const renderContent = () =>
    clientState.data?.contacts && !arrayIsEmpty(clientState.data.contacts) ? (
      <CardContainer className={s.container}>
        <div className={s.sectionHeader}>
          <SectionHeader
            className={s.sectionHeaderContent}
            data={contacts || null}
            title="All Recommendations"
            description="Browse and reach out to your recommendations or start a list to manage for later"
            icon="recs"
            iconBackground="#F0F5FF"
            iconColor="#1966FF"
          />
          <Search
            classes={{ container: s.search }}
            onChange={filterContacts}
            inputPlaceholder="Search recommendations…"
          />
        </div>
        <div className={s.content}>
          <div className={s.contentHeader}>
            <div className={s.tags}>
              {tags.map((tag) => (
                <TagRecs className={s.tag} text={tag} key={tag} />
              ))}
            </div>
            <div className={s.actions}>
              <Button
                className={s.buttonCreate}
                handler={toggleCreateListModal}
                variant="outlined"
              >
                Create List
              </Button>
              <Button
                className={s.buttonContact}
                variant="contained"
                handler={() => toggleContactMulti()}
              >
                Contact
              </Button>
            </div>
          </div>
          {contactsDebounce && <RecsTable data={contactsDebounce} />}
        </div>
      </CardContainer>
    ) : (
      <EmptyRecommendations />
    )

  return (
    <div className={classNames(s.main, className)}>
      {!clientState.isLoading ? renderContent() : <LoaderPage />}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .main {
    width: 100%;
    padding: 10px 14px 14px;
  }

  .container {
    width: 100%;
  }

  .search {
    max-width: 289px;
    width: 100%;
  }

  .sectionHeader {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-right: 25px;
    margin-bottom: 11px;

    @include mobile {
      flex-flow: column nowrap;
      padding-right: 0;
    }
  }

  .sectionHeaderContent {
    padding-right: 0;
  }

  .search {
    padding-bottom: 0;
    margin-left: auto;
    @include mobile {
      margin-left: 0;
    }
  }

  .contentHeader {
    display: flex;
    flex-flow: row wrap;
    padding-bottom: 27px;
    padding-left: 20px;
    padding-right: 20px;

    @include mobile {
      flex-flow: column nowrap;
      align-items: center;
    }
  }

  .tags {
    @include mobile {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      max-width: 400px;
      width: 100%;
    }
  }

  .emptyRecs {
    max-width: 800px;
    width: 100%;
    padding: 20px;
    margin-left: auto;
    margin-right: auto;

    border-radius: 10px;
    background: var(--white);
  }

  .buttonCreate {
    width: 105px;
    margin-right: 10px;
  }

  .buttonContact {
    width: 86px;
  }

  .tag {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .actions {
    margin-left: auto;

    padding-left: 27px;
    border-left: 1px solid #e6e6e6;

    @include mobile {
      margin-top: 15px;
      margin-left: 0;
      padding-left: 0;
      border-left: none;
    }
  }
`

export default AllRecsContent
