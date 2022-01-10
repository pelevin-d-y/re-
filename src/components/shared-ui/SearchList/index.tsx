import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Button from 'src/components/shared-ui/Button'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { LoaderComponent } from '../Loader'

type Props = {
  className?: string
  data: FormattedListData
  user: UserData
}

const SearchList: React.FC<Props> = ({
  className,
  data: { info, id, contacts },
  user,
}) => {
  const { addUsers } = usePlaylist()
  const { getPlaylists } = usePlaylists()

  const [loading, setLoading] = useState(false)

  const addUserHandler = useCallback(async () => {
    setLoading(true)
    await addUsers(id, [user])
      .then(() => getPlaylists())
      .catch((err) => console.log(`addUsers err => ${err} `))
    setLoading(false)
  }, [id, user])

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.mainInfo}>
        <div className={s.title}>{info?.name}</div>
        {info?.description && (
          <div className={s.description}>{info.description}</div>
        )}
        {contacts && (
          <AvatarsList
            avatarWidth={38}
            avatarHeight={38}
            className={s.avatars}
            users={contacts}
            showHiddenUsers
          />
        )}
      </div>
      <div className={classNames(s.actions)}>
        <Button variant="outlined" handler={addUserHandler}>
          Add
        </Button>
      </div>
      {loading && <LoaderComponent className={s.loading} />}
    </div>
  )
}

const s = css`
  .container {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding: 11px 16px 11px 21px;
    border-bottom: 1px solid #f6f6f6;
  }

  .title {
    padding-right: 50px;
    color: #000000;
    font-weight: 500;
    font-size: 20px;
    line-height: 42px;
  }

  .description {
    padding-right: 50px;
    color: #000000;
    font-weight: normal;
    font-size: 12px;
    line-height: 22px;
  }

  .tasks {
    margin-top: 7px;
  }

  .avatars {
    margin-top: 15px;
    margin-bottom: 20px;
  }
`

export default SearchList
