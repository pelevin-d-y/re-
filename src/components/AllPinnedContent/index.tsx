import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { arrayIsEmpty } from 'src/helpers/utils/array-is-empty'
import { useDebounce } from 'use-debounce/lib'
import SectionHeader from '../shared-ui/SectionHeader'
import { useClient } from '../context/ClientContext'
import Search from '../shared-ui/Search'
import { LoaderStatic } from '../shared-ui/Loader'
import EmptyRecommendations from '../shared-ui/EmptyRecommendations'
import TableActions from '../shared-ui/TableActions'
import { TableProvider } from '../context/TableContext'
import { usePinned } from '../context/PinnedContext'
import PinnedTable from './PinnedTable'

type Props = {
  className?: string
}

const AllPinnedContent: React.FC<Props> = ({ className }) => {
  const { state: pinnedState } = usePinned()

  const [pinned, setPinned] = useState(pinnedState.data)
  const [pinnedDebounce] = useDebounce(pinned, 700)

  const filterPinned = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pinnedState.data) {
      const allContacts = pinnedState.data
      const filteredContacts = allContacts.filter(
        (item) =>
          (item.name as string)
            .toLocaleLowerCase()
            .search(event.target.value.toLocaleLowerCase()) !== -1
      )

      setPinned(filteredContacts)
    }
  }

  useEffect(() => {
    setPinned(pinnedState.data)
  }, [pinnedState.data])

  const renderContent = () =>
    pinnedState.data && !arrayIsEmpty(pinnedState.data) ? (
      <CardContainer className={s.container}>
        <div className={s.sectionHeader}>
          <SectionHeader
            className={s.sectionHeaderContent}
            data={pinned || null}
            title="All Pinned Contacts"
            description="Followup with these pinned contacts. You can create a new list with pinned contacts to manage for later."
            icon="pin"
            iconBackground="#F0F5FF"
            iconColor="#5265af"
            hideNumber
          />
          <Search
            classes={{ container: s.search }}
            onChange={filterPinned}
            inputPlaceholder="Search recommendations…"
          />
        </div>
        <div className={s.content}>
          <TableProvider>
            <div className={s.contentHeader}>
              <TableActions className={s.actions} buttons={['contact']} />
            </div>
            {pinnedDebounce && <PinnedTable data={pinnedDebounce} />}
          </TableProvider>
        </div>
      </CardContainer>
    ) : (
      'Empty placeholder'
    )

  return (
    <div className={classNames(s.main, className)}>
      {!pinnedState.isLoading ? renderContent() : <LoaderStatic />}
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
