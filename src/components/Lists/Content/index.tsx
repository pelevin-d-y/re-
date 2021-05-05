import React from 'react'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import SectionsHeader from './SectionsHeader'
import ListsCatalog from './ListsCatalog'

const ListsContent: React.FC = () => (
  <div className={s.container}>
    <CardContainer className={s.section}>
      <SectionsHeader
        title="Contacts"
        description="Search your contacts to create lists"
        icon="contacts"
        iconBackground="#F0F5FF"
        iconColor="#1966FF"
      />
    </CardContainer>
    <ListsCatalog />
  </div>
)

const s = css`
  .container {
    width: 70%;
    padding: 0 12px 12px 0;
  }

  .section {
    margin-bottom: 15px;
  }
`

export default ListsContent
