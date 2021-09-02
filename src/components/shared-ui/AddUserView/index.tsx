import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Search from 'src/components/shared-ui/Search'
import Avatar from 'src/components/shared-ui/Avatar'
import { css } from 'astroturf'
import { useDebounce } from 'use-debounce'
import { getContactsMutable, postContactsSearch } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { useTable } from 'src/components/context/TableContext'
import useOnClickOutside from 'src/helpers/hooks/use-click-outside'

type Props = {
  className?: string
}

const AddUserView: React.FC<Props> = ({ className }) => {
  const [searchState, setSearchState] = useState('')
  const [searchValue] = useDebounce(searchState, 700)
  const [contacts, setContacts] = useState<any[]>([])
  const { addUser: addUserToPlaylist } = useTable()

  const ref = useRef(null)

  useEffect(() => {
    if (searchValue) {
      const search = async () => {
        const searchResponse = await postContactsSearch(searchValue)
        const contactsResp = await Promise.all(
          searchResponse.data.flatMap((item: string, index: number) => {
            if (index < 20) {
              return getContactsMutable(item)
            }
            return []
          })
        )
        const formattedContacts = contactsResp.map((contact: any) =>
          formatContactData(
            Object.values(contact.data)[0] as any,
            Object.keys(contact.data)[0]
          )
        )
        setContacts(formattedContacts)
      }
      search()
    } else {
      setContacts([])
    }
  }, [searchValue])

  useOnClickOutside(ref, () => {
    setContacts([])
  })

  const searchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(evt.target.value)
  }

  const addUser = (user: any) => {
    addUserToPlaylist(user)
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
        {contacts?.map((item) => (
          <li className={s.item} key={item.id}>
            <div className={s.profile}>
              <Avatar className={s.avatar} image={item.avatar} />
              <span className={s.name}>{item.fullName}</span>
            </div>
            <Button
              className={s.button}
              variant="outlined"
              handler={() => addUser(item)}
            >
              add
            </Button>
          </li>
        ))}
      </ul>
    </CardContainer>
  )
}

const s = css`
  .search {
    width: 100%;
  }

  .searchInput {
    outline: none;
  }

  .list {
    list-style: none;
    padding: 0;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 22px 0;
    border-bottom: 1px solid #f6f6f6;
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .avatar {
    margin-right: 22px;
  }

  .name {
    font-size: 14px;
    line-height: 17px;
    font-weight: var(--bold);
  }

  .container.active {
    box-shadow: 0px 4px 8px rgb(0 0 0 / 12%), 0px 1px 1px rgb(34 34 34 / 10%);
  }
`

export default AddUserView
