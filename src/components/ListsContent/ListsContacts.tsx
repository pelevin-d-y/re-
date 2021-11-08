import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { useClient } from 'src/components/context/ClientContext'
import SectionsHeader from '../shared-ui/SectionHeader'

type Props = {
  className?: string
}

const ListsContacts: React.FC<Props> = ({ className }) => {
  const { state } = useClient()

  return state?.contacts ? (
    <div className={className}>
      <CardContainer>
        <SectionsHeader
          data={state.contacts}
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
