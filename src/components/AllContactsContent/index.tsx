import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { arrayIsEmpty } from 'src/helpers/utils/array-is-empty'
import { useDebounce } from 'use-debounce/lib'
import { get } from 'src/api/requests'
import formatContactData from 'src/helpers/utils/format-contact-data'

import SectionHeader from '../shared-ui/SectionHeader'
import { useClient } from '../context/ClientContext'
import Search from '../shared-ui/Search'
import { LoaderPage } from '../shared-ui/Loader'
import EmptyRecommendations from '../shared-ui/EmptyRecommendations'
import ContactsTable from './ContactsTable'
import TableActions from '../shared-ui/TableActions'

type Props = {
  className?: string
}

const AllContactsContent: React.FC<Props> = ({ className }) => {
  const { state: clientState } = useClient()

  const [loading, setLoading] = useState(false)
  const [mutableData, setMutableData] = useState<
    FormattedContact[] | undefined
  >(undefined)

  useEffect(() => {
    setLoading(true)
    if (clientState.data?.contacts) {
      get
        .getContactsMutable(
          clientState?.data?.contacts.map((item) => item.contact_id)
        )
        .then((res) => {
          const formattedData = Object.entries(res).map(([id, contact]) =>
            formatContactData(contact, id)
          )
          setMutableData(formattedData)
          setLoading(false)
        })
    }
  }, [clientState.data?.contacts])

  const [contactsDebounce] = useDebounce(mutableData, 700)

  const filterContacts = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (mutableData) {
      const filteredContacts = mutableData.filter(
        (item) =>
          (item.name as string)
            .toLocaleLowerCase()
            .search(event.target.value.toLocaleLowerCase()) !== -1
      )

      setMutableData(filteredContacts)
    }
  }

  const renderContent = () =>
    mutableData && !arrayIsEmpty(mutableData) ? (
      <CardContainer className={s.container}>
        <div className={s.sectionHeader}>
          <SectionHeader
            className={s.sectionHeaderContent}
            data={mutableData || null}
            title="All contacts"
            description="Create lists with your contacts to organize tasks "
            icon="contacts"
            iconBackground="#F0F5FF"
            iconColor="#1966FF"
          />
        </div>
        <div className={s.content}>
          <div className={s.contentHeader}>
            <Search
              classes={{ container: s.search }}
              onChange={filterContacts}
              inputPlaceholder="Search contacts"
            />
            <TableActions
              className={s.actions}
              buttons={['dots', 'filter', 'contact']}
            />
          </div>
          {contactsDebounce && <ContactsTable data={contactsDebounce} />}
        </div>
      </CardContainer>
    ) : (
      <EmptyRecommendations />
    )

  return (
    <div className={classNames(s.main, className)}>
      {!loading ? renderContent() : <LoaderPage />}
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
  }

  .contentHeader {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 21px 23px 23px 20px;

    @include mobile {
      padding: 16px 12px;

      flex-flow: column nowrap;
      align-items: flex-start;
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

  .actions {
    display: flex;
    flex-flow: row nowrap;
    flex: 1 0 auto;

    @include mobile {
      width: 100%;
      flex-flow: row wrap;
      margin-top: 14px;
    }
  }

  .dots {
    margin-left: auto;
    max-width: 61px;
    width: 100%;

    @include mobile {
      margin-left: 0;
    }
  }

  .button {
    margin-left: 8px;
    @include mobile {
      margin-top: 6px;
    }
  }

  .contact,
  .filter {
    max-width: 97px;
    width: 100%;

    @include mobile {
      margin-left: 3px;
    }
  }
`

export default AllContactsContent
