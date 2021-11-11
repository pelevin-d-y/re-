import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

import SectionHeader from '../shared-ui/SectionHeader'
import { useClient } from '../context/ClientContext'
import Search from '../shared-ui/Search'
import RecsTable from './RecsTable'
import { LoaderPage } from '../shared-ui/Loader'
import { TagRecs } from '../shared-ui/Tags'
import Button from '../shared-ui/Button'
import { usePopup } from '../context/PopupContext'
import { useTable } from '../context/TableContext'

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
  const { state: selectedUsers } = useTable()
  const { dispatch: popupDispatch } = usePopup()
  const contacts = useMemo(() => clientState?.contacts, [clientState?.contacts])

  const contactMulti = () => {
    popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  return (
    <div className={classNames(s.main, className)}>
      {contacts ? (
        <CardContainer className={s.container}>
          <div className={s.sectionHeader}>
            <SectionHeader
              className={s.sectionHeaderContent}
              data={contacts}
              title="All Recommendations"
              description="Browse and reach out to your recommendations or start a list to manage for later"
              icon="recs"
              iconBackground="#F0F5FF"
              iconColor="#1966FF"
            />
            <Search
              classes={{ container: s.search }}
              inputPlaceholder="Search contacts…"
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
                <Button className={s.buttonCreate} variant="outlined">
                  Create List
                </Button>
                <Button
                  className={s.buttonContact}
                  variant="contained"
                  handler={() => contactMulti()}
                >
                  Contact
                </Button>
              </div>
            </div>
            <RecsTable data={contacts} />
          </div>
        </CardContainer>
      ) : (
        <LoaderPage />
      )}
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
      padding-right: 0;
      flex-flow: column nowrap;
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
    margin-bottom: 27px;
    padding-left: 20px;
    padding-right: 20px;
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
  }

  .actions {
    margin-left: auto;

    padding-left: 27px;
    border-left: 1px solid #e6e6e6;
  }
`

export default AllRecsContent
