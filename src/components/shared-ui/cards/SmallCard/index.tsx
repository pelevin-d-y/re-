import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import Star from 'src/components/shared-ui/Star'
import Stars from 'src/components/shared-ui/Starts'
import Avatar from 'src/components/shared-ui/Avatar'
import Popover from 'src/components/shared-ui/Popover'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import { usePopup } from 'src/helpers/context/PopupContext'
import CardContainer from '../CardContainer'

interface Props {
  className?: string
  src: string
}

const SmallCard: React.FC<Props> = ({ className, src }) => {
  const { openPopup } = usePopup()
  return (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar src={src} width={44} height={44} className={s.avatar} />
      <div className={s.name}>Landon Tucker</div>
      <div className={s.actionType}>
        <ColorfulCircle />
        Follow up on Meetings
      </div>
      <Popover
        triggerElement={
          <Button
            className={s.button}
            variant="contained"
            isArrow
            handler={() => openPopup()}
          >
            Reach out
          </Button>
        }
        popupContent={
          <CardContainer className={s.popup}>
            <ul className={s.list}>
              <li className={s.item}>
                <div className={s.popupButton}>
                  Rate Recommendation
                  <Stars className={s.stars} />
                </div>
              </li>
              <li className={s.item}>
                <button type="button" className={s.popupButton}>
                  Schedule Send
                </button>
              </li>
              <li className={s.item}>
                <button type="button" className={s.popupButton}>
                  Ignore
                </button>
              </li>
            </ul>
          </CardContainer>
        }
      />
      <Star className={s.star} />
    </CardContainer>
  )
}

const s = css`
  .container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background: var(--white);

    width: 100%;
    padding: 14px 24px 18px 24px;
  }

  .avatar {
    margin-bottom: 15px;
  }

  .actionType {
    margin-bottom: 12px;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
  }

  .star {
    position: absolute;
    top: 13px;
    right: 13px;
  }

  .button {
    max-width: 140px;
    width: 100%;
  }

  .popup {
    padding: 6px 0;
    background: var(--white);
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .item {
    padding: 0 15px;

    &:last-child {
      .popupButton {
        border-bottom: none;
      }
    }
  }

  .stars {
    margin-top: 6px;
  }

  .popupButton {
    width: 100%;
    padding-top: 9px;
    padding-bottom: 9px;

    font-size: 12px;
    font-weight: var(--bold);
    text-align: left;
    background: var(--white);
    border: none;
    border-bottom: 1px solid var(--lightGrey);
    cursor: pointer;
  }
`

export default SmallCard
