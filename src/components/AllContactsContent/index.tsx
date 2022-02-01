import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { get } from 'src/api/requests'
import formatContactData from 'src/helpers/utils/format-contact-data'

import { isArray, debounce } from 'lodash'
import { getName } from 'src/helpers/utils/get-name'
import SectionHeader from '../shared-ui/SectionHeader'
import Search from '../shared-ui/Search'
import { LoaderStatic } from '../shared-ui/Loader'
import ContactsTable from './ContactsTable'
import TableActions from '../shared-ui/TableActions'

type Props = {
  className?: string
}

const AllContactsContent: React.FC<Props> = ({ className }) => {
  const [loading, setLoading] = useState(false)
  const [mutableData, setMutableData] = useState<
    FormattedContact[] | undefined
  >(undefined)
  const [searchText, setSearchText] = useState<string>('')
  const [searchResults, setSearchResults] = useState<FormattedContact[]>([])

  const fetchData = async () => {
    return get.getContactsMutable().then(async (res) => {
      const formattedData = Object.entries(res).map(([id, contact]) => {
        const contactData = formatContactData(contact, id)

        return contactData
      })
      setMutableData(formattedData)
    })
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true)
        await fetchData()
        setLoading(false)
      } catch (err) {
        console.log('AllContactsContent fetchDataAsync err ==>', err)
      }
    }
    fetchDataAsync()
  }, [])

  useEffect(() => {
    if (mutableData) {
      const results = mutableData.filter((item: FormattedContact) => {
        return (
          getName(item)?.toLowerCase().includes(searchText.toLowerCase()) ||
          (!isArray(item?.emails?.[0]?.data) &&
            item?.emails?.[0]?.data
              ?.toLowerCase()
              .includes(searchText.toLowerCase()))
        )
      })
      setSearchResults(results)
    }
  }, [mutableData, searchText])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const debounceHandleSearch = useMemo(() => {
    return debounce(handleSearch, 300)
  }, [])

  const renderContent = () =>
    mutableData && (
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
            hideNumber={false}
          />
        </div>
        <div className={s.content}>
          <div className={s.contentHeader}>
            <Search
              classes={{ container: s.search }}
              onChange={debounceHandleSearch}
              inputPlaceholder="Search contacts"
            />
            <TableActions className={s.actions} buttons={['contact']} />
          </div>
          {searchResults && (
            <ContactsTable data={searchResults} fetchData={fetchData} />
          )}
        </div>
      </CardContainer>
    )

  return (
    <div className={classNames(s.main, className)}>
      {!loading ? renderContent() : <LoaderStatic />}
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
