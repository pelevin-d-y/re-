import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Search from 'src/components/shared-ui/Search'
import { css } from 'astroturf'
import { useDebounce } from 'use-debounce'
import { get, post } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import useOnClickOutside from 'src/helpers/hooks/use-click-outside'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import UserItem from './UserItem'
import { LoaderItem } from '../Loader'

type Props = {
  className?: string
}

const AddUserView: React.FC<Props> = ({ className }) => {
  const [searchState, setSearchState] = useState('')
  const [searchValue] = useDebounce(searchState, 700)
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<FormattedContacts[]>([])
  const { state: playlistState } = usePlaylist()

  const ref = useRef(null)

  useEffect(() => {
    if (searchValue) {
      const search = async () => {
        setIsLoading(true)
        try {
          const searchResponse = await post.postContactsSearch(searchValue)
          let formattedContacts: FormattedContacts[] | [] = []
          const excludedUserIds = searchResponse.filter(
            (item) =>
              !playlistState?.contacts?.find((contact) => contact.id === item)
          )

          if (excludedUserIds.length > 0) {
            const contactsResp = await get.getContactsMutable(
              excludedUserIds.map((item: any) => item)
            )

            formattedContacts = Object.entries(contactsResp).map(
              ([id, contact]) => formatContactData(contact as any, id)
            )
          }

          setIsLoading(false)
          setContacts(formattedContacts)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('search err ==>', err)
          setIsLoading(false)
        }
      }
      search()
    } else {
      setContacts([])
    }
  }, [playlistState?.contacts, searchValue])

  useOnClickOutside(ref, () => {
    setContacts([])
  })

  const searchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(evt.target.value)
  }

  return (
    <CardContainer
      className={classNames(
        s.container,
        className,
        contacts.length > 0 && s.active
      )}
      ref={ref}
    >
      <Search
        classes={{ input: s.searchInput }}
        inputPlaceholder="Search contacts…"
        onChange={searchHandler}
      />
      <ul className={s.list}>
        {isLoading ? (
          <div className={s.loader}>
            <LoaderItem />
          </div>
        ) : (
          contacts?.map((item) => <UserItem data={item} key={item.id} />)
        )}
      </ul>
    </CardContainer>
  )
}

const s = css`
  .container {
    position: relative;
    z-index: 18;
    box-shadow: none;
  }

  .search {
    width: 100%;
  }

  .searchInput {
    outline: none;
  }

  .list {
    position: absolute;
    top: 100%;
    z-index: 20;
    left: 0;

    max-height: 300px;
    width: 100%;
    padding: 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);

    overflow: auto;
    background: #ffffff;
    list-style: none;
  }

  .loader {
    width: 100%;
    height: 70px;
  }

  .active .list {
    padding: 5px;
  }
`

export default AddUserView
