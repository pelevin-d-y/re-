import React from 'react'
import testUsersWithPlaceholderFields from 'src/testUsersWithPlaceholderFields'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import SectionsHeader from '../SectionsHeader'

type Props = {
  className?: string
}

const ListsContacts: React.FC<Props> = ({ className }) => (
  <div className={className}>
    <CardContainer>
      <SectionsHeader
        data={testUsersWithPlaceholderFields}
        title="Contacts"
        description="Search your contacts to create lists"
        icon="contacts"
        iconBackground="#F0F5FF"
        iconColor="#1966FF"
        link={{ text: 'View', href: '#' }}
      />
    </CardContainer>
  </div>
)

export default ListsContacts
