import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import CardList from 'src/components/shared-ui/cards/CardList'
import { getContactsMutable, getPlaylistsData, getPlaylists } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import SectionsHeader from './ListsSectionsHeader'

type Props = {
  className?: string
}

type CardsStructure = {
  firstColumn: any
  secondColumn: any
}

const ListsCatalog: React.FC<Props> = ({ className }) => {
  const [lists, setLists] = useState<ListRequest[]>([])

  useEffect(() => {
    const getPlaylistsAsync = async () => {
      const playlistsIds = await getPlaylists()
      const playlistsData = await getPlaylistsData(
        playlistsIds.data.map((item: string) => item)
      )

      const contactsResp: any = await Promise.all(
        playlistsData.data.map((playlist: any) => {
          const { contacts: playlistContacts } = playlist
          return playlistContacts.length > 0
            ? getContactsMutable(
                playlistContacts.map((item: any) => item.contact_id)
              )
            : null
        })
      )

      const contacts = contactsResp.map((item: any) => item && item.data)

      const playlistsWithContacts = playlistsData.data.map(
        (item: any, index) => {
          let newItem = item
          newItem.contacts = contacts[index]
            ? Object.entries(contacts[index]).map(([id, contact]) =>
                formatContactData(contact as any, id)
              )
            : []

          return newItem
        }
      )

      setLists(playlistsWithContacts)
    }

    getPlaylistsAsync()
  }, [])

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
