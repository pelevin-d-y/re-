import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { arrayIsEmpty } from 'src/helpers/utils/array-is-empty'
import { useDebounce } from 'use-debounce/lib'

import SectionHeader from '../shared-ui/SectionHeader'
import { useClient } from '../context/ClientContext'
import Search from '../shared-ui/Search'
import { LoaderPage } from '../shared-ui/Loader'
import Button from '../shared-ui/Button'
import { usePopup } from '../context/PopupContext'
import EmptyRecommendations from '../shared-ui/EmptyRecommendations'
import ContactsTable from './ContactsTable'

type Props = {
  className?: string
}

const AllContactsContent: React.FC<Props> = ({ className }) => {
  const { state: clientState } = useClient()
  const { dispatch: popupDispatch } = usePopup()

  const [contacts, setContacts] = useState(clientState.data?.contacts)
  const [contactsDebounce] = useDebounce(contacts, 700)

  const toggleContactMulti = () => {
    popupDispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
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
            <div className={s.actions}>
              <Button className={classNames(s.dots)} variant="outlined">
                •••
              </Button>
              <Button
                className={classNames(s.button, s.filter)}
                variant="outlined"
                isArrow
              >
                Filter
              </Button>
              <Button
                handler={() => toggleContactMulti()}
                className={classNames(s.contact, s.button)}
                variant="contained"
              >
                Contact
              </Button>
            </div>
          </div>
          {contactsDebounce && <ContactsTable data={contactsDebounce} />}
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
