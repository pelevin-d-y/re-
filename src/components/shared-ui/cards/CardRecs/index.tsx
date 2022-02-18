import React, { useState } from 'react'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import Avatar from 'src/components/shared-ui/Avatar'
import NextStep from 'src/components/shared-ui/NextStep'
import { LoaderAbsolute } from 'src/components/shared-ui/Loader'
import { getName } from 'src/helpers/utils/get-name'

type Props = {
  className?: string
  data: RecommendationUser
  addUser: (user: RecommendationUser) => void
}

const CardRecs: React.FC<Props> = ({ data, addUser }) => {
  const [isLoading, setIsLoading] = useState(false)

  const addUsersHandler = async () => {
    setIsLoading(true)
    await addUser(data)
    setIsLoading(false)
  }

  return (
    <CardContainer className={s.container}>
      <div className={s.header}>
        <Avatar
          className={s.avatar}
          name={getName(data)}
          image={data?.image_url}
        />
        <div className={s.info}>
          <div className={s.name}>{getName(data)}</div>
          {/* <div className={s.job}>Fund Manager @ JPM</div> */}
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
          {data?.message_template_description && (
            <NextStep
              text={parseMessage(data.message_template_description, data.name)}
            />
          )}
        </div>
      </div>
      {isLoading && <LoaderAbsolute />}
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    position: relative;
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
