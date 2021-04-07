import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Avatar from 'src/components/shared-ui/Avatar'
import Button from 'src/components/shared-ui/Button'
import Star from 'src/components/shared-ui/Star'
import Popover from 'src/components/shared-ui/Popover'
import PopoverContent from 'src/components/shared-ui/Popover/PopoverContent'
import CardContainer from '../CardContainer'

interface Props {
  className?: string
}

const avatars = [
  {
    src: require('public/images/gino.jpeg'),
    id: 1,
  },
  {
    src: require('public/images/maker.jpeg'),
    id: 2,
  },
  {
    src: require('public/images/mary.jpeg'),
    id: 3,
  },
  {
    src: require('public/images/gino.jpeg'),
    id: 4,
  },
  {
    src: require('public/images/mary.jpeg'),
    id: 5,
  },
  {
    src: require('public/images/gino.jpeg'),
    id: 6,
  },
  {
    src: require('public/images/maker.jpeg'),
    id: 7,
  },
]

const CardItsBeen: React.FC<Props> = ({ className }) => (
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
      {avatars.map((item, index) => (
        <div
          className={s.avatar}
          key={item.id}
          style={{ transform: `translateX(-${index * 10}px)` }}
        >
          <Avatar image={item.src} />
        </div>
      ))}
    </div>
    <div className={s.buttons}>
      <Popover
        triggerElement={
          <Button
            className={classNames(s.buttonDots, s.button)}
            variant="outlined"
          >
            •••
          </Button>
        }
        popupContent={
          <PopoverContent
            items={[
              {
                name: 'Manage',
                handler: () => null,
              },
              {
                name: 'Unsubscribe',
                handler: () => null,
              },
            ]}
          />
        }
      />
      <Button
        className={classNames(s.buttonList, s.button)}
        variant="contained"
      >
        View List
      </Button>
    </div>
  </CardContainer>
)

const s = css`
  .container {
    position: relative;
    padding: 26px 24px 26px 15px;
  }

  .star {
    position: absolute;
    top: 21px;
    right: 24px;
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
    margin-left: -17px;
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
