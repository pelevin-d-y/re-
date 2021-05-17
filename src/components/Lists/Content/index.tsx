import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import SectionsHeader from './SectionsHeader'
import ListsCatalog from './ListsCatalog'

type Props = {
  className?: string
}

const ListsContent: React.FC<Props> = ({ className }) => (
  <div className={classNames(s.container, className)}>
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
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    width: 70%;
    padding: 0 12px 12px 0;

    @include tablet {
      padding-right: 0;
    }
  }

  .section {
    margin-bottom: 15px;
  }
`

export default ListsContent
