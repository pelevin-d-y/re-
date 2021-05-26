import React, { useState, useEffect, useMemo } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Search from 'src/components/shared-ui/Search'
import Avatar from 'src/components/shared-ui/Avatar'
import { useUsers } from 'src/components/context/UsersContext'
import { useLists } from 'src/components/context/ListsContext'
import { useDebounce } from 'use-debounce'
import Popover from '../PopoverBase'

type Props = {
  list?: List
  className?: string
}

const PopoverAddContact: React.FC<Props> = ({ list, className }) => {
  const { state: listsData, setState: setLists } = useLists()
  const {
    state: { data: users },
  } = useUsers()

  const [searchState, setSearchState] = useState('')
  const [searchValue] = useDebounce(searchState, 700)

  const initUsers = useMemo(
    () =>
      users.filter(
        (item) =>
          !list?.users?.find((listUser) => listUser.address === item.address)
      ),
    [users, list]
  )

  const [filteredUsers, setFilteredUsers] = useState(initUsers)

  useEffect(() => {
    setFilteredUsers(
      initUsers.filter(
        (user) =>
          user.name?.toLowerCase().search(searchValue.toLowerCase()) !== -1
      )
    )
  }, [searchValue, initUsers])

  const searchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(evt.target.value)
  }

  const addUserHandler = (user: UserData) => {
    if ((list?.id && listsData) !== undefined) {
      const newLists = listsData?.map((item) => {
        if (item.id === list?.id) {
          return {
            ...item,
            users: [...item.users, user],
          }
        }
        return item
      })
      if (newLists) setLists(newLists)
    }
  }

  return (
    <Popover
      triggerElement={
        <Button
          className={classNames(className, s.contacts)}
          variant="outlined"
        >
          + Add contact
        </Button>
      }
      popupContent={
        <CardContainer className={s.popup}>
          <Search
            classes={{ input: s.searchInput }}
            inputPlaceholder="Search contacts…"
            onChange={searchHandler}
          />
          <ul className={s.list}>
            {filteredUsers?.map((item) => (
              <li className={s.item} key={item.first_message_id}>
                <div className={s.profile}>
                  <Avatar
                    className={s.avatar}
                    image={require(`public/images/${item.avatar}`)}
                  />
                  <span className={s.name}>{item.name}</span>
                </div>
                <Button
                  className={s.button}
                  variant="outlined"
                  handler={() => addUserHandler(item)}
                >
                  add
                </Button>
              </li>
            ))}
          </ul>
        </CardContainer>
      }
    />
  )
}

const s = css`
  .popup {
    overflow: auto;
    min-width: 375px;
    padding: 18px 20px;
    padding-bottom: 0;
    max-height: 350px;
    background: var(--white);
  }

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
`

export default PopoverAddContact
