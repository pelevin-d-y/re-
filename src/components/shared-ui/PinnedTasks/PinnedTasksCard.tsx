import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import CardContainer from '../cards/CardContainer'
import Avatar from '../Avatar'
import Pin from '../Pin'

type Props = {
  className?: string
  data?: UserData | null
  template?: Template
}

const PinnedTasksCard: React.FC<Props> = ({ className, data, template }) =>
  data && template ? (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar
        className={s.avatar}
        width={38}
        height={38}
        image={require(`public/images/${data.avatar}`)}
        strength={data.connection_E}
      />
      <div className={s.info}>
        <div className={s.name}>{data.name}</div>
        <div>{parseMessage(template.Header, data.name)}</div>
      </div>
      <Pin className={s.star} />
    </CardContainer>
  ) : null

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 18px 40px 20px 20px;
  }

  .avatar {
    flex: 0 0 auto;
    margin-right: 14px;
  }

  .info {
    font-size: 12px;
    line-height: 14px;
  }

  .name {
    margin-bottom: 5px;
    font-weight: var(--bold);
  }

  .star {
    margin-left: auto;
  }
`

export default PinnedTasksCard
