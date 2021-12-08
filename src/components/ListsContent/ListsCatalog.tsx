import React, { useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardList from 'src/components/shared-ui/cards/CardList'
import { usePlaylists } from 'src/components//context/PlaylistsContext'
import SectionsHeader from '../shared-ui/SectionHeader'
import { LoaderPage } from '../shared-ui/Loader'

type Props = {
  className?: string
}

type CardsStructure = {
  firstColumn: ListData[]
  secondColumn: ListData[]
}

const ListsCatalog: React.FC<Props> = ({ className }) => {
  const {
    state: { data: lists, isLoading },
    getPlaylists,
    dispatch,
  } = usePlaylists()

  useEffect(() => {
    const getPlaylistsAsync = async () => {
      try {
        dispatch({ type: 'UPDATE_IS_LOADING', payload: true })
        await getPlaylists()

        dispatch({ type: 'UPDATE_IS_LOADING', payload: false })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('ListsCatalog err ==>', err)
      }
    }

    getPlaylistsAsync()
  }, [dispatch, getPlaylists])

  const cardsStructure: CardsStructure = useMemo(() => {
    const value: CardsStructure = {
      firstColumn: [],
      secondColumn: [],
    }

    lists?.map((item, index) => {
      const remainder = (index + 1) % 2
      if (remainder) {
        return value.firstColumn.push(item)
      }

      return value.secondColumn.push(item)
    })

    return value
  }, [lists])

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
