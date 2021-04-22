import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import UserEvent from 'src/components/shared-ui/UserEvent'
import CardContainer from '../cards/CardContainer'
import Avatar from '../Avatar'
import Star from '../Star'

type Props = {
  className?: string
  name: string
  image: string
  event: string
}

const ImportantCard: React.FC<Props> = ({ className, name, image, event }) => (
  <CardContainer className={classNames(className, s.container)}>
    <Avatar className={s.avatar} width={38} height={38} image={image} />
    <div className={s.info}>
      <div className={s.name}>{name}</div>
      <UserEvent text={event} />
    </div>
    <Star className={s.star} />
  </CardContainer>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 18px 40px 20px 20px;
  }

  .avatar {
    margin-right: 14px;
  }

  .info {
    font-size: 12px;
    line-height: 14px;
  }

  .name {
    margin-bottom: 5px;
    font-weight: var(--bold);
  }

  .star {
    margin-left: auto;
  }
`

export default ImportantCard
