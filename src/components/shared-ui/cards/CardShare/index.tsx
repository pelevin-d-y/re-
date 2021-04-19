import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { users } from 'src/testData'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Star from 'src/components/shared-ui/Star'
import Button from 'src/components/shared-ui/Button'
import Link from 'next/link'

type Props = {
  className?: string
}

const CardShare: React.FC<Props> = ({ className }) => {
  const { toggleRecommendationPopup } = usePopup()
  const { updateUsersData } = useUsers()
  const openModalHandler = () => {
    updateUsersData(users)
    toggleRecommendationPopup()
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <Star className={s.star} />
      <div className={s.header}>
        <div className={s.cardEvent}>James was mentioned on Techcrunch</div>
        <div className={s.title}>Fintech Startup get acquired</div>
        <img
          alt=""
          className={s.cardImage}
          src={require('public/images/fintech.png')}
        />
      </div>
      <div className={s.line}>
        <AvatarsList className={s.avatars} users={users} />

      </div>
      <div className={s.line}>
        <div className={s.buttons}>
          <PopoverDots
            className={classNames(className, s.buttonDots)}
            variant="outlined"
          />
          <Button
            className={classNames(s.buttonList, s.button)}
            variant="contained"
            handler={openModalHandler}
          >
            View List
          </Button>
        </div>
        <div className={s.shareLink}>
          <Link href="bit.ly/new-mention/techcrunch">
            <a>bit.ly/new-mention/techcrunch</a>
          </Link>
        </div>
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    overflow: hidden;
    position: relative;
    padding: 26px 24px 26px 15px;
  }

  .star {
    position: absolute;
    top: 14px;
    right: 17px;
    z-index: 10;
  }

  .header {
    position: relative;
    margin-bottom: 44px;
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

  .buttons {
    max-width: 300px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
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
  }

  .shareLink {
    padding: 13px;
    background: #f3f3f3;
    color: var(--blue);

    a {
      color: var(--blue);
    }
  }

  .buttonDots {
    max-width: 30%;
    width: 100%;
  }

  .avatars {
    margin-bottom: 15px;
  }
`

export default CardShare
