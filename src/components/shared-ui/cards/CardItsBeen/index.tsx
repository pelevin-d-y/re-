import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Avatar from 'src/components/shared-ui/Avatar'
import Button from 'src/components/shared-ui/Button'
import Star from 'src/components/shared-ui/Star'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import { users } from 'src/testData'
import CardContainer from '../CardContainer'

type Props = {
  className?: string
}

const CardItsBeen: React.FC<Props> = ({ className }) => {
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
        <div className={s.cardName}>It’s been</div>
        <div className={s.title}>90 Days…</div>
        <SvgIcon
          className={s.clock}
          icon={require('public/svg/clock.svg?include')}
        />
      </div>
      <div className={s.avatars}>
        {users.map((item, index) => (
          <div
            className={s.avatar}
            key={item.id}
            style={{ transform: `translateX(-${index * 10}px)` }}
          >
            <Avatar image={item.avatar} />
          </div>
        ))}
      </div>
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

  .clock {
    position: absolute;
    right: 16px;
    top: 11px;

    width: 66px;
    height: 66px;
    color: #4da9ff;
  }

  .cardName {
    font-size: 24px;
    line-height: 42px;
    font-weight: var(--semiBold);
  }
  .title {
    font-size: 38px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .avatars {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 18px;
  }

  .buttons {
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

  .buttonDots {
    max-width: 30%;
    width: 100%;
  }
`

export default CardItsBeen
