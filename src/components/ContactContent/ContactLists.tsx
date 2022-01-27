import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { getName } from 'src/helpers/utils/get-name'
import CardList from '../shared-ui/cards/CardList'
import PopoverAddList from '../shared-ui/popover/PopoverAddList'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
}

type CardsStructure = {
  firstColumn: ListData[]
  secondColumn: ListData[]
}

const ContactLists: React.FC<Props> = ({ className, data }) => {
  const { state: playlistsState } = usePlaylists()
  const lists = useMemo(
    () =>
      playlistsState.data?.reduce<ListData[]>((acc, item) => {
        if (
          item.contacts?.find(
            (contact) => contact.contact_id === data.contact_id
          )
        ) {
          return [...acc, item]
        }
        return acc
      }, []),
    [data.contact_id, playlistsState.data]
  )

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
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.text}>Current lists {getName(data)} is in:</div>
        <PopoverAddList className={s.add} user={data} lists={lists} />
      </div>
      <div className={s.list}>
        <div className={s.column}>
          {cardsStructure.firstColumn.map((item: any) => (
            <CardList className={s.card} key={item.playlist_id} data={item} />
          ))}
        </div>
        <div className={s.column}>
          {cardsStructure.secondColumn.map((item: any) => (
            <CardList className={s.card} key={item.playlist_id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    width: 100%;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 25px 21px 17px 21px;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 15px;
    padding: 6px 21px 31px 21px;

    @include mobile {
      grid-template-columns: none;
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  .add {
    font-weight: bold;
    font-size: 18px;
    line-height: 31px;
    color: var(--blue);
    cursor: pointer;
  }

  .card {
    margin-bottom: 15px;
  }

  .text {
    font-size: 16px;
    line-height: 31px;
    color: #808080;
  }
`

export default ContactLists
