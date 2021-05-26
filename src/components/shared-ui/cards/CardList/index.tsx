import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import { useRouter } from 'next/router'
import CardContainer from '../CardContainer'
import CardActions from '../CardActions'

type Props = {
  className?: string
  id: number
  title: string
  description: string
  image: string
  users: UserData[]
}

const CardList: React.FC<Props> = ({
  className,
  id,
  title,
  description,
  users,
  image,
}) => {
  const router = useRouter()

  return (
    <CardContainer className={classNames(s.container, className)}>
      <img src={image} alt="icon" className={s.image} />
      <div className={s.title}>{title}</div>
      <div className={s.description}>{description}</div>
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
        mainAction={() => router.push(`/list/${id}`)}
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

  .avatars {
    margin-top: 17px;
    margin-bottom: 20px;
  }

  .actions {
    margin-top: auto;
  }
`

export default CardList
