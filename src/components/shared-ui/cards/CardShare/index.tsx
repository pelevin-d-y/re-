import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { users } from 'src/testData'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Star from 'src/components/shared-ui/Star'
import Socials from 'src/components/shared-ui/Socials'
import ShareLink from 'src/components/shared-ui/ShareLink'
import CardActions from '../CardActions'

type Props = {
  className?: string
  variant: 'dark' | 'light'
  image: string
  title: string
  event: string
  link?: string
}

const CardShare: React.FC<Props> = ({
  className,
  variant,
  image,
  title,
  event,
  link,
}) => {
  const { toggleRecommendationPopup } = usePopup()
  const { updateUsersData } = useUsers()
  const openModalHandler = () => {
    updateUsersData(users)
    toggleRecommendationPopup()
  }

  return (
    <CardContainer
      className={classNames(
        s.container,
        variant === 'dark' ? s.dark : s.light,
        className
      )}
    >
      <Star className={s.star} />
      <div className={s.info}>
        <div className={s.cardEvent}>{event}</div>
        <div className={s.title}>{title}</div>
        <img alt="fintech" className={s.cardImage} src={image} />
      </div>
      <div className={s.actions}>
        <div className={classNames(s.topLine, s.line)}>
          <AvatarsList className={s.avatars} users={users.slice(0, 7)} />
          <Socials />
        </div>
        <div className={s.line}>
          <CardActions
            mainAction={openModalHandler}
            mainText="Follow up with all"
          />
          <ShareLink link={link as string} />
        </div>
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    overflow: hidden;
    position: relative;
  }

  .star {
    position: absolute;
    top: 14px;
    right: 17px;
    z-index: 10;
  }

  .info {
    position: relative;
    padding: 26px 24px 75px 15px;
    margin-bottom: -29px;
  }

  .cardImage {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 24px;
  }

  .cardEvent {
    font-size: 24px;
    line-height: 42px;
    font-weight: var(--semibold);
  }
  .title {
    font-size: 32px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .button {
    margin-left: 17px;
  }

  .buttonList {
    max-width: 70%;
    width: 100%;
  }

  .line {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  .topLine {
    margin-bottom: 16px;
    align-items: flex-end;
  }

  .buttonDots {
    max-width: 30%;
    width: 100%;
  }

  .actions {
    padding: 0 24px 17px 15px;
  }

  .dark {
    .info {
      color: var(--white);
      background: #171d23;
    }
  }

  .light {
    .info {
      color: var(--black);
      background: var(--white);
    }
  }
`

export default CardShare
