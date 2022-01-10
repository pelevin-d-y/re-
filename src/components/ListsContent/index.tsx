import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { useClient } from '../context/ClientContext'
import { LoaderComponent } from '../shared-ui/Loader'
import CardContainer from '../shared-ui/cards/CardContainer'
import SectionHeader from '../shared-ui/SectionHeader'
import ListsTabs from './ListsTabs'

type Props = {
  className?: string
}

const ListsContent: React.FC<Props> = ({ className }) => {
  const { state } = useClient()

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.main}>
        {state.data?.contacts ? (
          <CardContainer>
            <SectionHeader
              data={state.data.contacts}
              title="Contacts"
              description="Search your contacts to create lists"
              icon="contacts"
              iconBackground="#F0F5FF"
              iconColor="#1966FF"
              link={{ text: 'View', href: '/contacts' }}
            />
            <ListsTabs />
          </CardContainer>
        ) : (
          <div className={s.loader}>
            <LoaderComponent />
          </div>
        )}
      </div>
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
    max-width: 1200px;
    width: 100%;
    padding: 0 12px 12px 0;
    margin-left: auto;
    margin-right: auto;
    @include tablet {
      width: 100%;
      padding: 0;
    }
  }

  .loader {
    position: relative;
    height: 100px;
  }
`

export default ListsContent
