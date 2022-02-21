import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import UserInfoEmail from './UserInfoEmail'
import EditField from '../EditField'
import SvgIcon from '../SvgIcon'

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
  const nameData =
    mutableData?.find((item) => {
      return item.type === 'name' && item.meta.type === 'primary'
    }) || mutableData?.find((item) => item.type === 'name')
  const onSaveName = (val: string) => {
    if (nameData) {
      updateData(
        [
          {
            ...nameData,
            data: val.split(' '),
            review: 1,
            meta: {
              ...nameData.meta,
              type: 'primary',
            },
          },
        ],
        [{ ...nameData, review: 2 }],
        updateDataCallback
      )
    } else {
      updateData(
        [
          {
            type: 'name',
            data: val.split(' '),
            review: 1,
            meta: {
              type: 'primary',
            },
          },
        ],
        [],
        updateDataCallback
      )
    }
  }

  return (
    <div className={classNames(s.container, className)}>
      <ul className={s.list}>
        {mutableData && (
          <li className={s.item}>
            <UserInfoEmail data={mutableData} updateApiData={updateData} />
          </li>
        )}
        <li className={s.item}>
          <div className={s.itemTitle}>
            <span>Name</span>
            <SvgIcon className={s.pen} icon="pen.svg" />
          </div>
          <EditField
            type="text"
            value={nameData?.data.join(' ') || ''}
            classPrefix="profile-card-"
            onSave={(val: string) => onSaveName(val)}
          />
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
  .container {
  }

  .list {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .item {
    position: relative;
    padding: 14px 20px;

    font-size: 12px;
    line-height: 14px;
    border-bottom: 1px solid #dddddd;

    &:hover {
      .pen {
        opacity: 1;
      }
    }
  }

  .itemTitle {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 10px;
    white-space: nowrap;
    color: #adadad;
  }

  .pen {
    width: 15px;
    height: 13px;

    opacity: 0;
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
