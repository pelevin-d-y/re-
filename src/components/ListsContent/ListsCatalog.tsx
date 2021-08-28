import React, { useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardList from 'src/components/shared-ui/cards/CardList'
import { useLists } from 'src/components/context/ListsContext'
import { getPlaylists } from 'src/api'
import SectionsHeader from './ListsSectionsHeader'

type Props = {
  className?: string
}

type CardsStructure = { firstColumn: Lists; secondColumn: Lists }

const ListsCatalog: React.FC<Props> = ({ className }) => {
  const { state: listsState } = useLists()
  useEffect(() => {
    getPlaylists().then((res) => {
      res.data.map((item: string) =>
        getPlaylists(item).then((itemRes) =>
          console.log('getPlaylists(item)', itemRes)
        )
      )
    })
  }, [])

  const cardsStructure: CardsStructure = useMemo(() => {
    const value: CardsStructure = {
      firstColumn: [],
      secondColumn: [],
    }
    listsState?.map((item, index) => {
      const remainder = (index + 1) % 2
      if (remainder) {
        return value.firstColumn.push(item)
      }

      return value.secondColumn.push(item)
    })
    return value
  }, [listsState])

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
        <div className={s.column}>
          {cardsStructure.firstColumn.map((item) => (
            <CardList className={s.card} key={item.id} data={item} />
          ))}
        </div>
        <div className={s.column}>
          {cardsStructure.secondColumn.map((item) => (
            <CardList className={s.card} key={item.id} data={item} />
          ))}
        </div>
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

  .card {
    margin-bottom: 15px;
  }
`

export default ListsCatalog
