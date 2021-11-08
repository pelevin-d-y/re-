import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import SectionHeader from '../shared-ui/SectionHeader'
import { useClient } from '../context/ClientContext'
import Search from '../shared-ui/Search'
import Avatar from '../shared-ui/Avatar'
import PopoverUserInfo from '../shared-ui/popover/PopoverUserInfo'

type Props = {
  className?: string
}

const AllRecsContent: React.FC<Props> = ({ className }) => {
  const { state: clientState } = useClient()
  const contacts = useMemo(() => clientState?.contacts, [clientState?.contacts])

  return (
    <div className={classNames(s.main, className)}>
      {contacts && (
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
            {contacts.map((item) => (
              <div className={s.cell} key={item.contact_id}>
                <Avatar
                  className={s.avatar}
                  image={item.avatar}
                  strength={item.relationshipStrength}
                />{' '}
                {item.templateData && (
                  <PopoverUserInfo
                    className={s.name}
                    data={item}
                    template={item.templateData}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContainer>
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

  .sectionHeader {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-right: 25px;
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

  .cell {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 10px;
  }
`

export default AllRecsContent
