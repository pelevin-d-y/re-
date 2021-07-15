import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardList from 'src/components/shared-ui/cards/CardList'
import { useLists } from 'src/components/context/ListsContext'
import SectionsHeader from './ListsSectionsHeader'

type Props = {
  className?: string
}

const ListsCatalog: React.FC<Props> = ({ className }) => {
  const { state: listsState } = useLists()

  return (
    <CardContainer className={classNames(s.container, className)}>
      <SectionsHeader
        data={listsState}
        title="Your lists"
        description="List of people with a common themes"
        icon="lists"
        iconBackground="#ECFFFD"
        iconColor="#0DB09D"
        link={{ text: 'Create New', href: '/create-list' }}
      />
      <div className={s.list}>
        {listsState?.map((item) => (
          <CardList key={item.id} data={item} />
        ))}
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    width: 100%;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    padding: 6px 21px 31px 21px;

    @include mobile {
      grid-template-columns: none;
      padding-left: 16px;
      padding-right: 16px;
    }
  }
`

export default ListsCatalog
