import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { useClient } from 'src/components/context/ClientContext'
import SectionsHeader from './ListsSectionsHeader'

type Props = {
  className?: string
}

const ListsContacts: React.FC<Props> = ({ className }) => {
  const {
    state: { data },
  } = useClient()

  return data?.contacts ? (
    <div className={className}>
      <CardContainer>
        <SectionsHeader
          data={data.contacts}
          title="Contacts"
          description="Search your contacts to create lists"
          icon="contacts"
          iconBackground="#F0F5FF"
          iconColor="#1966FF"
          link={{ text: 'View', href: '#' }}
        />
      </CardContainer>
    </div>
  ) : null
}

export default ListsContacts
