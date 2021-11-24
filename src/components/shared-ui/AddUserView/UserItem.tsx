import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import Avatar from 'src/components/shared-ui/Avatar'
import Button from 'src/components/shared-ui/Button'
import { LoaderComponent } from '../Loader'

type Props = {
  className?: string
  data: FormattedContacts
  listId: string
}

const UserItem: React.FC<Props> = ({ className, data, listId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { addUsers: addUserToPlaylist } = usePlaylist()

  const addUser = async (user: FormattedContacts) => {
    setIsLoading(true)
    addUserToPlaylist(listId, [user])
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('addUser err ==>', err)
        setIsLoading(false)
      })
  }

  return (
    <li className={classNames(s.container, className)}>
      <div className={s.profile}>
        <Avatar className={s.avatar} image={data.avatar} />
        <span className={s.name}>{data.fullName}</span>
      </div>
      <Button
        className={s.button}
        variant="outlined"
        handler={() => addUser(data)}
      >
        add
      </Button>
      {isLoading && <LoaderComponent />}
    </li>
  )
}

const s = css`
  .container {
    position: relative;

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

export default UserItem
