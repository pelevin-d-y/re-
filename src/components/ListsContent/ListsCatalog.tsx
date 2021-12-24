import React, { useMemo } from 'react'
import { css } from 'astroturf'
import CardList from 'src/components/shared-ui/cards/CardList'
import { usePlaylists } from 'src/components//context/PlaylistsContext'
import { LoaderPage } from '../shared-ui/Loader'

type Props = {
  data: ListData[]
}

type CardsStructure = {
  firstColumn: ListData[]
  secondColumn: ListData[]
}

const ListsCatalog: React.FC<Props> = ({ data }) => {
  const {
    state: { isLoading },
  } = usePlaylists()

  const cardsStructure: CardsStructure = useMemo(() => {
    const value: CardsStructure = {
      firstColumn: [],
      secondColumn: [],
    }

    data?.map((item, index) => {
      const remainder = (index + 1) % 2
      if (remainder) {
        return value.firstColumn.push(item)
      }

      return value.secondColumn.push(item)
    })

    return value
  }, [data])

  return (
    <>
      {isLoading && <LoaderPage />}
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
    </>
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
    padding: 27px 21px 31px 21px;

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
