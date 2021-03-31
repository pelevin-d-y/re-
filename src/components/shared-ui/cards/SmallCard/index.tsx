import React, { useState } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import Star from 'src/components/shared-ui/Star'
import Avatar from 'src/components/shared-ui/Avatar'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import { Popover } from 'react-tiny-popover'
import CardContainer from '../CardContainer'

interface Props {
  className?: string
  src: string
}

const SmallCard: React.FC<Props> = ({ className, src }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  return (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar src={src} width={44} height={44} className={s.avatar} />
      <div className={s.name}>Landon Tucker</div>
      <div className={s.actionType}>
        <ColorfulCircle />
        Follow up on Meetings
      </div>
      <Popover
        isOpen={isPopoverOpen}
        positions={['bottom', 'top', 'left', 'right']}
        content={<div>Hi! I'm popover content.</div>}
      >
        <Button
          className={s.button}
          handler={() => setIsPopoverOpen(!isPopoverOpen)}
          variant="contained"
          isArrow
        >
          Reach out
        </Button>
      </Popover>
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
`

export default SmallCard
