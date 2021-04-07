import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from '../cards/CardContainer'
import Avatar from '../Avatar'
import ColorfulCircle from '../ColorfulCircle'
import Star from '../Star'

interface Props {
  className?: string
}

const ImportantCard: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(className, s.container)}>
    <Avatar className={s.avatar} width={38} height={38} />
    <div className={s.info}>
      <div className={s.name}>Landon Tucker</div>
      <ColorfulCircle />
      Follow up on Meetings
    </div>
    <Star />
  </CardContainer>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    padding: 18px 40px 20px 20px;
  }

  .avatar {
    margin-right: 14px;
  }
`

export default ImportantCard
