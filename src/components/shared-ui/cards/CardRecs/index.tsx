import React from 'react'
import classNames from 'classnames'
import {css} from 'astroturf'
import CardContainer from '../CardContainer'
import Button from '../../Button'
import Avatar from '../../Avatar'
import parseMessage from 'src/helpers/utils/parse-message'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
  data: UserData
  addUsers?: (user: UserData) => void
}

const CardRecs: React.FC<Props> = ({className, data, addUsers}) => {
  const addUsersHandler = () => {
    if (addUsers) {
      addUsers(data)
    }
  }

  return (
    <CardContainer className={s.container}>
      <div className={s.header}>
       <Avatar image={data?.avatar} className={s.avatar} /> 
        <div className={s.info}>
          <div className={s.name}>{data.name}</div>
          <div className={s.job}>Fund Manager @ JPM</div>
        </div>
        <Button className={s.button} handler={addUsersHandler} type='button' variant='outlined'>
          +
        </Button>
      </div>
      <div className={s.footer}>
      <div className={s.text}>
          {data.templateData?.Summary &&
            parseMessage(data.templateData?.Summary, data.name)}
        </div>
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    background: #F0F5FF;
    margin-right: 13px;
    height: auto;
  }

  .header {
    background: white;
    display: flex;
    justify-content: space-between;
    padding: 17px 18px 14px 21px;
  }

  .avatar {
    margin-right: 11px;
  }

  .info {
    margin-right: 21px;
  }
  
  .name {
    font-size: 12px;
    font-weight: 800;
    line-height: 14px;
    white-space: nowrap;
  }
  
  .job {
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    white-space: nowrap;
  }

  .footer {
    padding: 8px 16px 12px 22px;
  }

  .text {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #1966FF;
  }
`;

export default CardRecs
