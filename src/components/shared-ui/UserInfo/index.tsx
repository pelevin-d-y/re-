import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import UserInfoEmail from './UserInfoEmail'
import UserInfoItem from './UserInfoItem'

type Props = {
  className?: string
  mutableData?: ContactMutable[]
  updateData: UpdateMutableData
  updateDataCallback?: () => void
}

const UserInfo: React.FC<Props> = ({
  className,
  mutableData,
  updateData,
  updateDataCallback,
}) => {
  return (
    <div className={classNames(s.container, className)}>
      <ul className={s.list}>
        <li className={s.item}>
          <UserInfoItem
            mutableData={mutableData}
            updateData={updateData}
            updateDataCallback={updateDataCallback}
            mutableDataType="name"
            label="Name"
          />
        </li>
        <li className={s.item}>
          <UserInfoItem
            mutableData={mutableData}
            updateData={updateData}
            updateDataCallback={updateDataCallback}
            mutableDataType="name_short"
            label="Nickname"
          />
        </li>
        {mutableData && (
          <li className={s.item}>
            <UserInfoEmail data={mutableData} updateApiData={updateData} />
          </li>
        )}
        {/* <li className={s.item}>
          <UserInfoItem
            mutableData={mutableData}
            updateData={updateData}
            updateDataCallback={updateDataCallback}
            mutableDataType="title"
            label="Title"
          />
        </li>
        <li className={s.item}>
          <UserInfoItem
            mutableData={mutableData}
            updateData={updateData}
            updateDataCallback={updateDataCallback}
            mutableDataType="company"
            label="Company"
          />
        </li> */}
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
