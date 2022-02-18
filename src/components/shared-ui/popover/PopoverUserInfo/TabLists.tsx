import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import CardContainer from '../../cards/CardContainer'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
}

const TabLists: React.FC<Props> = ({ className, data }) => {
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

  return (
    <div className={classNames(className, s.container)}>
      <ul>
        {lists?.map((list) => (
          <li className={s.item} key={list.playlist_id}>
            <a className={s.link} href={`/list?id=${list.playlist_id}`}>
              <CardContainer className={s.card}>
                <div className={s.title}>{list.info?.name}</div>
                <div className={s.description}>{list.info?.description}</div>
              </CardContainer>
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className={s.button}>
        + Add to new list{' '}
      </button>
    </div>
  )
}

const s = css`
  .container {
    padding: 16px 16px 34px 16px;
  }

  .link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .card {
    padding: 16px 16px 12px 16px;
  }

  .title {
    margin-bottom: 10px;

    font-size: 16px;
    font-weight: var(--bold);
  }

  .description {
    font-size: 12px;
  }

  .button {
    padding: 10px;
    width: 100%;
    margin-top: 17px;

    cursor: pointer;
    background: none;
    border: 1px dashed var(--primary1);
    border-radius: 6px;
    font-size: 14px;
    line-height: 26px;
    color: var(--primary1);
  }
`

export default TabLists
