import React from 'react'
import { css } from 'astroturf'
import CardList from 'src/components/shared-ui/cards/CardList'
import { usePlaylists } from 'src/components//context/PlaylistsContext'
import { LoaderPage } from '../shared-ui/Loader'

type Props = {
  data: ListData[]
}

const ListsCatalog: React.FC<Props> = ({ data }) => {
  const {
    state: { isLoading },
  } = usePlaylists()

  return (
    <>
      {isLoading && <LoaderPage />}
      <div className={s.list}>
        {data.map((item) => (
          <CardList className={s.card} key={item.playlist_id} data={item} />
        ))}
      </div>
    </>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    width: 100%;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    padding: 27px 21px 31px 21px;

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
