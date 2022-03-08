import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { debounce } from 'lodash'
import { getName } from 'src/helpers/utils/get-name'
import SectionHeader from '../shared-ui/SectionHeader'
import Search from '../shared-ui/Search'
import { LoaderStatic } from '../shared-ui/Loader'
import TableActions from '../shared-ui/TableActions'
import { TableProvider } from '../context/TableContext'
import { usePinned } from '../context/PinnedContext'
import PinnedTable from './PinnedTable'

type Props = {
  className?: string
}

const AllPinnedContent: React.FC<Props> = ({ className }) => {
  const [searchResults, setSearchResults] = useState<FormattedContact[]>([])
  const [searchText, setSearchText] = useState<string>('')

  const { state } = usePinned()
  const { isLoading, data } = state

  useEffect(() => {
    if (data) {
      const results = (
        data as Array<RecommendationUser | FormattedContact>
      ).filter((item: FormattedContact | RecommendationUser) => {
        return getName(item).toLowerCase().includes(searchText.toLowerCase())
      })
      setSearchResults(results as FormattedContact[])
    }
  }, [data, searchText])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const debounceHandleSearch = useMemo(() => {
    return debounce(handleSearch, 300)
  }, [])

  const renderContent = () =>
    searchResults && (
      <CardContainer className={s.container}>
        <div className={s.sectionHeader}>
          <SectionHeader
            className={s.sectionHeaderContent}
            data={searchResults || null}
            title="All Pinned Contacts"
            description="Followup with these pinned contacts. You can create a new list with pinned contacts to manage for later."
            icon="pin"
            iconBackground="#F0F5FF"
            iconColor="#5265af"
            hideNumber
          />
          <Search
            classes={{ container: s.search }}
            onChange={debounceHandleSearch}
            inputPlaceholder="Search recommendations…"
          />
        </div>
        <div className={s.content}>
          <TableProvider>
            <div className={s.contentHeader}>
              <TableActions
                className={s.actions}
                buttons={['clearPinnedContacts', 'contact', 'addToList']}
              />
            </div>
            {searchResults && <PinnedTable data={searchResults} />}
          </TableProvider>
        </div>
      </CardContainer>
    )

  return (
    <div className={classNames(s.main, className)}>
      {!isLoading ? renderContent() : <LoaderStatic />}
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

  .emptyRecs {
    max-width: 800px;
    width: 100%;
    padding: 20px;
    margin-left: auto;
    margin-right: auto;

    border-radius: 10px;
    background: var(--shades2);
  }

  .buttonCreate {
    width: 105px;
    margin-right: 10px;
  }

  .buttonContact {
    width: 86px;
  }

  .actions {
    margin-left: auto;

    @include mobile {
      margin-top: 15px;
      margin-left: 0;
      padding-left: 0;
      border-left: none;
    }
  }
`

export default AllPinnedContent
