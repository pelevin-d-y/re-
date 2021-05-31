import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Search from 'src/components/shared-ui/Search'
import Avatar from 'src/components/shared-ui/Avatar'
import { css } from 'astroturf'
import { useDebounce } from 'use-debounce'

type Props = {
  className?: string
  handler: (item: UserData) => void
  users: UserData[]
}

const AddUserView: React.FC<Props> = ({ className, handler, users }) => {
  const [searchState, setSearchState] = useState('')
  const [searchValue] = useDebounce(searchState, 700)

  const [filteredUsers, setFilteredUsers] = useState(users)

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name?.toLowerCase().search(searchValue.toLowerCase()) !== -1
      )
    )
  }, [searchValue, users])

  const searchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(evt.target.value)
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
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
              handler={() => handler(item)}
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
`

export default AddUserView
