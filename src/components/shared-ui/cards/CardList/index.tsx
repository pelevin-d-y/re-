import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import Button from 'src/components/shared-ui/Button'
import { useRouter } from 'next/router'
import { get } from 'src/api'
import { useQuery, UseQueryResult } from 'react-query'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import CardContainer from '../CardContainer'
import Loader from '../../Loader'

type Props = {
  className?: string
  data: ListData
}

const CardList: React.FC<Props> = ({
  className,
  data: { info, id, contacts },
}) => {
  const router = useRouter()
  const { deletePlaylists } = usePlaylists()
  const [isLoading, setIsLoading] = useState(false)

  const contactsQuery: UseQueryResult<FormattedContacts[], unknown> = useQuery({
    queryKey: ['PlaylistContacts', { id }],
    queryFn: () => {
      if (contacts.length > 0) {
        return get
          .getContactsMutable(contacts.map((item) => item.contact_id))
          .then((res) =>
            Object.entries(res).map(([contactId, contact]) =>
              formatContactData(contact, contactId)
            )
          )
      }
      return undefined
    },
  })
  const { data } = contactsQuery

  const deleteHandler = async () => {
    setIsLoading(true)
    await deletePlaylists([id])
    setIsLoading(false)
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      {/* {image && <Img img={image} alt="icon" className={s.image} />} */}
      <div className={s.title}>{info.name}</div>
      {info?.description && (
        <div className={s.description}>{info.description}</div>
      )}
      {/* <Tasks className={s.tasks} data={tasks} /> */}
      {data && (
        <AvatarsList
          avatarWidth={38}
          avatarHeight={38}
          className={s.avatars}
          users={data}
          showHiddenUsers
        />
      )}
      <div className={classNames(s.actions)}>
        <PopoverDots
          variant="outlined"
          items={[
            {
              name: 'Edit',
              handler: () => null,
            },
            {
              name: 'Duplicate',
              handler: () => null,
            },
            {
              name: 'Delete',
              handler: deleteHandler,
            },
          ]}
        />
        <Button
          variant="contained"
          handler={() => router.push(`/list?id=${id}`)}
        >
          View List
        </Button>
      </div>
      {isLoading && <Loader />}
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
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 9px 18px;

    width: 100%;
    margin-top: auto;
  }
`

export default CardList
