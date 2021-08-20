import React from 'react'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import CardContainer from '../CardContainer'
import Button from '../../Button'
import Avatar from '../../Avatar'

type Props = {
  className?: string
  data: UserData
  addUsers?: (user: UserData) => void
}

const CardRecs: React.FC<Props> = ({ className, data, addUsers }) => {
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
        <Button
          className={s.button}
          handler={addUsersHandler}
          type="button"
          variant="outlined"
        >
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
    padding: 8px 22px 12px 22px;
    margin: 0 0 17px 0;
    background: #F0F5FF;
    max-width: 90%;
    border-radius: 6px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      z-index: 2;
      height: 20px;
      width: 20px;
      top: -5px;
      right: -5px;
      background-image: url(/svg/logo-icon.svg);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .text {
    font-weight: 500;
    font-size: 13px;
    line-height: 13px;
  }
`

export default CardRecs
