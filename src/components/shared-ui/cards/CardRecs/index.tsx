import React from 'react'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import CardContainer from '../CardContainer'
import Button from '../../Button'
import Avatar from '../../Avatar'
import UserHeader from '../../UserHeader'

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
        <div className={s.message}>
          {data?.templateData?.Summary && (
            <UserHeader text={parseMessage(data.templateData?.Summary, data.name)} />
          )}
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
    max-width: 90%;
    margin-bottom: 18px;
  }
`

export default CardRecs
