import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { getName } from 'src/helpers/utils/get-name'
import { useRouter } from 'next/router'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import formatContactData from 'src/helpers/utils/format-contact-data'
import CardContainer from '../../cards/CardContainer'
import Avatar from '../../Avatar'
import PopoverDots from '../PopoverDots'
import Button from '../../Button'
import TabsContent from './TabsContent'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
  buttonHandler: () => void
  updateData: UpdateMutableData
  mutableData: ContactMutable[]
  updateDataCallback?: () => void
}

const PopupContent: React.FC<Props> = ({
  className,
  data,
  buttonHandler,
  mutableData,
  updateData,
  updateDataCallback,
}) => {
  const router = useRouter()
  const formattedMutableData = formatContactData(mutableData)
  const getAvatarUrl = () => {
    if ('image_url' in data) {
      return data.image_url
    }
    return data.avatar
  }

  const getSubject = () => {
    if ('message_template_subject' in data) {
      return data.message_template_subject
    }
    return ''
  }

  return (
    <CardContainer className={classNames(s.popup)}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <Avatar
            image={getAvatarUrl()}
            width={54}
            height={54}
            className={s.avatar}
            // strength={data.relationshipStrength}
          />
          <div className={s.headerInfo}>
            <div className={s.name}>
              {getName(formattedMutableData) || getName(data)}
            </div>
            <div className={s.subject}>{getSubject()}</div>
          </div>
        </div>
        {/* <UserHeader
              className={s.summary}
              text={parseMessage(Summary, name)}
            /> */}
        <div className={s.actions}>
          <PopoverDots
            variant="outlined"
            items={[
              {
                name: 'Manage',
                handler: () => router.push(`/contact?id=${data.contact_id}`),
              },
            ]}
          />
          {/* <PopoverActions
                  variant="contained"
                  buttonClickHandler={buttonHandler}
                  isArrow
                >
                  Say Hi
                </PopoverActions> */}
          <Button
            handler={buttonHandler}
            className={classNames(s.button)}
            variant="contained"
          >
            Compose
          </Button>
        </div>
      </div>
      {data && (
        <TabsContent
          className={s.tabs}
          data={data}
          mutableData={mutableData}
          updateData={updateData}
          updateDataCallback={updateDataCallback}
        />
      )}
    </CardContainer>
  )
}

const s = css`
  .popup {
    max-width: 308px;
    width: 100%;
  }

  .wrapper {
    padding: 20px;
  }

  .header {
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 12px;
  }

  .avatar {
    margin-right: 18px;
  }

  .name {
    margin-bottom: 7px;
    font-size: 16px;
    line-height: 19px;

    font-weight: var(--bold);
  }

  .summary {
    width: 100%;
    padding: 10px 13px;

    color: var(--blue);
    background: var(--lightBlue);
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 6px;
    margin-top: 0 px;
  }

  .button {
    text-align: center;
  }
`

export default PopupContent
