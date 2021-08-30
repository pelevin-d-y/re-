import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardList from 'src/components/shared-ui/cards/CardList'
import { useLists } from 'src/components/context/ListsContext'
import { getPlaylist, getPlaylists } from 'src/api'
import SectionsHeader from './ListsSectionsHeader'

type Props = {
  className?: string
}

type CardsStructure = {
  firstColumn: any
  secondColumn: any
}

const ListsCatalog: React.FC<Props> = ({ className }) => {
  const { state: listsState } = useLists()
  const [lists, setLists] = useState<ListRequest[]>([])

  useEffect(() => {
    getPlaylists().then((res: ListsRequest) => {
      Promise.all(res.data.map((item: string) => getPlaylist(item))).then(
        (resAll) => setLists(resAll)
      )
    })
  }, [])

  const cardsStructure: CardsStructure = useMemo(() => {
    const value: CardsStructure = {
      firstColumn: [],
      secondColumn: [],
    }
    lists?.map((item, index) => {
      const remainder = (index + 1) % 2
      if (remainder) {
        return value.firstColumn.push(item.data[0])
      }

      return value.secondColumn.push(item.data[0])
    })
    return value
  }, [lists])

  // console.log('cardsStructure', cardsStructure)

  return (
    <CardContainer className={classNames(s.container, className)}>
      <SectionsHeader
        data={lists}
        title="Your lists"
        description="List of people with a common themes"
        icon="lists"
        iconBackground="#ECFFFD"
        iconColor="#0DB09D"
        link={{ text: 'Create New', href: '/create-list' }}
      />
      <div className={s.list}>
        <div className={s.column}>
          {cardsStructure.firstColumn.map((item: any) => (
            <CardList className={s.card} key={item.id} data={item} />
          ))}
        </div>
        <div className={s.column}>
          {cardsStructure.secondColumn.map((item: any) => (
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
