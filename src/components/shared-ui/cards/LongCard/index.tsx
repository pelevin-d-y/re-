import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import InputArrow from 'public/svg/inputArrow.svg'
import Avatar from 'src/components/shared-ui/Avatar'
import Button from 'src/components/shared-ui/Button'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import CardContainer from '../CardContainer'

interface Props {
  className?: string
  data: {
    src: string
    name: string
    position: string
    event: string
  }
}

const LongCard: React.FC<Props> = ({ data, className }) => {
  const { src, name, position, event } = data

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.profile}>
        <Avatar className={s.avatar} src={src} />
        <div className={s.text}>
          <div className={s.name}>{name}</div>
          <div className={s.position}>{position}</div>
        </div>
      </div>
      <div className={s.event}>
        <ColorfulCircle color="black" />
        {event}
      </div>
      <Button variant="outlined" className={s.button}>
        Reach out
        <InputArrow className={s.arrow} />
      </Button>
    </CardContainer>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    padding: 10px 22px 14px 17px;
    margin-bottom: 8px;
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    max-width: 250px;
    width: 100%;

    margin-right: 9%;
  }

  .avatar {
    margin-right: 26px;
  }

  .event {
    flex: 1 0 auto;
  }

  .name {
    margin-bottom: 4px;
    font-weight: var(--bold);
    line-height: 16px;
  }

  .button {
    max-width: 119px;
    width: 100%;
    padding-right: 15px;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
`

export default LongCard
