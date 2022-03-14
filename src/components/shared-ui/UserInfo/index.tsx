import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import { HOCLastMessage } from 'src/components/HOCs/HOCLastMessage'
import UserInfoEmail from './UserInfoEmail'
import UserInfoItem from './UserInfoItem'
import UserInfoItemTextInput from './UserInfoItemTextInput'
import UserInfoLastMesaage from './UserInfoLastMesaage'

type Props = {
  className?: string
  id: string
  mutableData?: ContactMutable[]
  updateData: UpdateMutableData
  updateDataCallback?: () => void
}

const UserInfo: React.FC<Props> = ({
  className,
  mutableData,
  updateData,
  updateDataCallback,
  id,
}) => {
  return (
    <div className={classNames(s.container, className)}>
      <ul className={s.list}>
        <li className={s.item}>
          <UserInfoItem label="Name">
            <UserInfoItemTextInput
              mutableData={mutableData}
              updateData={updateData}
              updateDataCallback={updateDataCallback}
              mutableDataType="name"
              id={id}
            />
          </UserInfoItem>
        </li>
        <li className={s.item}>
          <UserInfoItem label="Nickname">
            <UserInfoItemTextInput
              mutableData={mutableData}
              updateData={updateData}
              updateDataCallback={updateDataCallback}
              mutableDataType="name_short"
              id={id}
            />
          </UserInfoItem>
        </li>
        {mutableData && (
          <li className={s.item}>
            <UserInfoEmail
              data={mutableData}
              updateApiData={updateData}
              updateDataCallback={updateDataCallback}
            />
          </li>
        )}
        <li className={s.item}>
          <UserInfoItem label="Last Message">
            <HOCLastMessage id={id}>
              {(lastMessageData, isLoading, ref) => (
                <UserInfoLastMesaage
                  data={lastMessageData}
                  isLoading={isLoading}
                  ref={ref}
                />
              )}
            </HOCLastMessage>
          </UserInfoItem>
        </li>

        {/* {data.last_contact_time && (
          <li className={s.item}>
            <div className={s.itemTitle}>
              <span>Met</span>
                <SvgIcon className={s.pen} icon="pen.svg" />
            </div>
            <div className={s.value}>{formatDate(data.last_contact_time)}</div>
          </li>
        )}
        {data.last_client_text && (
          <li className={s.item}>
            <div className={s.itemTitle}>
              <span>Last Outreach</span>
                <SvgIcon className={s.pen} icon="pen.svg" />
            </div>
            <div className={classNames(s.value, s.outreach)}>
              {data.last_client_text}
            </div>
          </li>
        )} */}
      </ul>
    </div>
  )
}

const s = css`
  .list {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .item {
    position: relative;
    padding: 14px 16px;

    font-size: 12px;
    line-height: 14px;

    &:hover {
      .pen {
        opacity: 1;
      }
    }
  }

  .outreach {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .triangle {
    margin-left: 4px;
    border: 5px solid transparent;
    border-top: 6px solid var(--primary1);
  }
`

export { UserInfo }
