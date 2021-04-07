import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import Star from 'src/components/shared-ui/Star'
import Stars from 'src/components/shared-ui/Starts'
import Avatar from 'src/components/shared-ui/Avatar'
import Popover from 'src/components/shared-ui/Popover'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import PopoverContent from 'src/components/shared-ui/Popover/PopoverContent'
import { usePopup } from 'src/helpers/context/PopupContext'
import CardContainer from '../CardContainer'

interface dataProps {
  id: number
  name: string
  image: string
}
interface Props {
  className?: string
  data: dataProps
}

const SmallCard: React.FC<Props> = ({ className, data }) => {
  const { openPopup, updatePopupData } = usePopup()
  const { name, image } = data

  const buttonHandler = () => {
    updatePopupData({ name, image })
    openPopup()
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar src={image} width={44} height={44} className={s.avatar} />
      <div className={s.name}>{name}</div>
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
            handler={() => buttonHandler()}
          >
            Reach out
          </Button>
        }
        popupContent={
          <PopoverContent
            items={[
              {
                name: 'Schedule Send',
                handler: () => null,
              },
              {
                name: 'Ignore',
                handler: () => null,
              },
            ]}
          >
            <div className={s.rate}>
              Rate Recommendation
              <Stars className={s.stars} />
            </div>
          </PopoverContent>
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

  .stars {
    margin-top: 6px;
  }

  .rate {
    padding: 9px 15px;
    font-weight: var(--bold);
  }
`

export default SmallCard
