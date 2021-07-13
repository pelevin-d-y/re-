import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Img from 'src/components/shared-ui/Img'
import Tasks from 'src/components/shared-ui/Tasks'
import { useRouter } from 'next/router'
import CardContainer from '../CardContainer'
import CardActions from '../CardActions'

type Props = {
  className?: string
  data: List
}

const CardList: React.FC<Props> = ({
  className,
  data: { id, title, description, users, image, tasks },
}) => {
  const router = useRouter()

  return (
    <CardContainer className={classNames(s.container, className)}>
      {image && <Img img={image} alt="icon" className={s.image} />}
      <div className={s.title}>{title}</div>
      <div className={s.description}>{description}</div>
      <Tasks className={s.tasks} data={tasks} />
      <AvatarsList
        avatarWidth={38}
        avatarHeight={38}
        className={s.avatars}
        users={users}
        showHiddenUsers
      />
      <CardActions
        className={s.actions}
        mainText="View List"
        mainAction={() => router.push(`/list?id=${id}`)}
      />
    </CardContainer>
  )
}

const s = css`
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
    margin-top: auto;
  }
`

export default CardList
