import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { usePopup } from 'src/components/context/PopupContext'
import CardContainer from '../../cards/CardContainer'
import Typography from '../../Typography'
import SvgIcon from '../../SvgIcon'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
}

const TabLists: React.FC<Props> = ({ className, data }) => {
  const { state: playlistsState } = usePlaylists()
  const { dispatch: popupDispatch } = usePopup()

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

  const openModal = () => {
    if (data) {
      popupDispatch({
        type: 'UPDATE_COMPOSE_MULTI_DATA',
        payload: [data] as RecommendationUser[] | FormattedContact[],
      })
      popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
    }
  }

  return (
    <div className={classNames(className, s.container)}>
      <ul>
        {lists?.map((list) => (
          <li className={s.item} key={list.playlist_id}>
            <a className={s.link} href={`/list?id=${list.playlist_id}`}>
              <CardContainer className={s.card}>
                <div className={s.titleWrapper}>
                  <SvgIcon className={s.icon} icon="lists.svg" />
                  <Typography
                    className={s.title}
                    fontVariant="inter"
                    fontWeight="medium"
                    styleVariant="body1"
                  >
                    {list.info?.name}
                  </Typography>
                </div>
                <Typography
                  fontVariant="inter"
                  fontWeight="medium"
                  styleVariant="body3"
                  className={s.description}
                >
                  {list.info?.description}
                </Typography>
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
    padding: 16px 16px 25px 16px;
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
    box-shadow: 0px 1px 1px 0px #22222219;
    padding: 16px 16px 12px 16px;
  }

  .titleWrapper {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }

  .icon {
    width: 15px;
    height: 15px;
    margin-right: 9px;
  }

  .title {
  }

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
