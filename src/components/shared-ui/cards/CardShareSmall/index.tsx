import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Button from 'src/components/shared-ui/Button'
import Pin from 'src/components/shared-ui/Pin'
import Img from 'src/components/shared-ui/Img'

type Props = {
  className?: string
  users?: UserData[]
  image: string
  title: string
}

const CardShareSmall: React.FC<Props> = ({
  className,
  users,
  image,
  title,
}) => {
  const { dispatch: popupDispatch } = usePopup()

  const openModalHandler = () => {
    if (users) {
      popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: null })
      popupDispatch({ type: 'UPDATE_COMPOSE_MULTI_DATA', payload: users })
      popupDispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
    }
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <div className={s.header}>
        <div className={s.title}>{title}</div>
        {users && (
          <AvatarsList
            className={s.avatars}
            avatarWidth={37}
            avatarHeight={37}
            users={users}
          />
        )}
      </div>
      <div className={s.content}>
        <Img className={s.img} img={image} alt="" />
      </div>
      <div className={s.actions}>
        <Pin className={s.pin} />
        <Button variant="contained" handler={openModalHandler}>
          {title}
        </Button>
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    padding: 10px 19px 24px 28px;
    justify-content: space-between;
  }

  .header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    margin-bottom: 7px;
  }

  .title {
    font-size: 18px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .content {
    position: relative;
    height: 150px;

    margin-right: -19px;
    margin-left: -28px;
  }

  .img {
    width: 100%;
    height: 100%;

    object-fit: contain;
  }

  .gradient {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 2;

    width: 70%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 54%,
      rgba(14, 17, 72, 0) 89%
    );
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 9px 18px;
    max-width: 100%;
    margin-top: 20px;
  }
`

export default CardShareSmall
