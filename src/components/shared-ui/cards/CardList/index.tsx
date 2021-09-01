import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Img from 'src/components/shared-ui/Img'
import Tasks from 'src/components/shared-ui/Tasks'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import Button from 'src/components/shared-ui/Button'
import { useRouter } from 'next/router'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
  data: any
}

const CardList: React.FC<Props> = ({
  className,
  data: { info, id, contacts, image, tasks },
}) => {
  const router = useRouter()

  const { dispatch: popupDispatch } = usePopup()
  const openDeletePopup = () => {
    popupDispatch({ type: 'TOGGLE_DELETE_LIST_POPUP' })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      {image && <Img img={image} alt="icon" className={s.image} />}
      <div className={s.title}>{info.name}</div>
      {info?.description && (
        <div className={s.description}>{info.description}</div>
      )}
      {/* <Tasks className={s.tasks} data={tasks} /> */}
      <AvatarsList
        avatarWidth={38}
        avatarHeight={38}
        className={s.avatars}
        users={contacts}
        showHiddenUsers
      />
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
              handler: openDeletePopup,
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
