import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Img from 'src/components/shared-ui/Img'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import Button from 'src/components/shared-ui/Button'
import { useRouter } from 'next/router'
import CardContainer from '../CardContainer'
import { LoaderComponent } from '../../Loader'
import Link from 'src/components/shared-ui/Link'
import SvgIcon from '../../SvgIcon'
import { usePopup } from 'src/components/context/PopupContext'

type Props = {
  className?: string
  data: FormattedListData
  showButtonAddList?: boolean
}

const CardList: React.FC<Props> = ({
  className,
  data: { info, id, contacts },
  showButtonAddList,
}) => {
  const router = useRouter()
  const {  createPlaylist, getPlaylists } = usePlaylists()
  const { dispatch: popupDispatch } = usePopup()

  const deleteHandler = async () => {
    popupDispatch({ type: 'TOGGLE_DELETE_LIST_POPUP' })
    popupDispatch({ type: 'UPDATE_LIST_ID_DATA', payload: id })
  }

  const moveToListPage = () => {
    router.push(`/list?id=${id}`)
  }

  const duplicateList = async () => {
    await createPlaylist({
      title: info?.name as string,
      description: info?.description,
      contacts: contacts?.map((item) => ({
        contact_id: item.contact_id,
      })),
    })
    getPlaylists()
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      {/* {image && <Img img={image} alt="icon" className={s.image} />} */}
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
      <div className={classNames(s.actions)}>
        <PopoverDots
          className={s.dots}
          variant="outlined"
          items={[
            {
              name: 'Edit',
              handler: moveToListPage,
            },
            {
              name: 'Duplicate',
              handler: duplicateList,
            },
            {
              name: 'Delete',
              handler: deleteHandler,
            },
          ]}
        />
        {showButtonAddList && (
          <Link className={s.link} href="#">
            Add to list
          </Link>
        )}
        <Link className={s.link} href={`/list?id=${id}`}>
          View List
          <SvgIcon className={s.linkIcon} icon="arrow-left.svg" />
        </Link>
      </div>
    </CardContainer>
  )
}

const s = css`
  .usersCount {
    margin-top: 20px;
    margin-bottom: 16px;

    font-size: 18px;
    font-weight: var(--bold);
  }

  .container {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;

    padding: 11px 16px 25px 21px;
  }

  .image {
    position: absolute;
    top: 20;
    right: 18px;

    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  .title {
    padding-right: 50px;
    margin-bottom: 10px;

    font-size: 24px;
    font-weight: var(--bold);
  }

  .description {
    padding-right: 50px;

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

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-top: auto;
  }

  .dots {
    min-width: 48px;
  }

  .link {
    position: relative;
    margin-left: 16px;

    text-decoration: none;
    font-size: 14px;
    line-height: 17px;
    color: var(--blue);
  }

  .linkIcon {
    width: 10px;
    height: 10px;
    margin-left: 6px;

    color: var(--blue);
    transform: rotate(180deg);
  }
`

export default CardList
