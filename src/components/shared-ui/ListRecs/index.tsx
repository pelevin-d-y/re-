import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import SvgIcon from '../SvgIcon'
import CardRecs from '../cards/CardRecs'

type Props = {
  className?: string
  contacts?: UserData[]
  playlistData: Playlist
}

const ListRecs: React.FC<Props> = ({ className, contacts, playlistData }) => {
  const { addUsers, getPlaylistData } = usePlaylist()

  const filteredContacts = useMemo(
    () =>
      contacts?.filter(
        (item) =>
          !playlistData?.contacts?.find(
            (listUser) => listUser.id === item.contact_id
          )
      ),
    [contacts, playlistData]
  )

  const addUserHandler = async (user: UserData) => {
    try {
      await addUsers(playlistData.id, [user])
      await getPlaylistData(playlistData.id)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: index.tsx ~ line 33 ~ addUserHandler ~ err', err)
    }
  }

  return filteredContacts?.length !== 0 ? (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <SvgIcon className={s.svg} icon="lists.svg" />
        <div className={s.title}>Add these recs to list?</div>
      </div>
      <div className={s.cards}>
        {filteredContacts?.map((user) => (
          <CardRecs addUser={addUserHandler} key={user.address} data={user} />
        ))}
      </div>
    </div>
  ) : null
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 12px 16px 23px 30px;

    @include mobile {
      padding-left: 16px;
    }
  }

  .header {
    display: flex;
    align-items: center;
  }

  .svg {
    width: 24px;
    height: 24px;
    color: #1966ff;
    margin-right: 16px;
  }

  .title {
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    color: #1966ff;
  }

  .cards {
    display: flex;
    overflow: scroll;
    min-height: 150px;
    padding: 19px 19px 9px 19px;
  }
`

export default ListRecs
