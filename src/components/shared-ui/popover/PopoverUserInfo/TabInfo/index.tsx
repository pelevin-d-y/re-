import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Img from 'src/components/shared-ui/Img'
import Button from 'src/components/shared-ui/Button'
import EasyEdit from 'react-easy-edit'
import { useClient } from 'src/components/context/ClientContext'
import formatTime from 'src/helpers/utils/parseTime'
import EmailsItem from './EmailsItem'

type Props = {
  className?: string
  data: any
}

const TabInfo: React.FC<Props> = ({ className, data }) => {
  const { state: clientState, updateUserData } = useClient()

  const onSave = (val: string, type: 'address' | 'name') => {
    const updatedContacts = clientState.data?.contacts?.map(
      (item: UserData) => {
        if (item.address === data.address) {
          return {
            ...item,
            [type]: val,
          }
        }
        return item
      }
    )

    // updateUserData({ ...clientState, contacts: updatedContacts })
  }

  const emails: string[] = data.emails ? data.emails : [data.address]

  return (
    <div className={classNames(s.container, className)}>
      <ul className={s.list}>
        {emails.length > 0 && (
          <li className={s.item}>
            <EmailsItem emails={emails} />
          </li>
        )}
        <li className={s.item}>
          <div className={s.itemTitle}>
            <span>Name</span>
            <Img alt="icon" className={s.pen} img="pen.png" />
          </div>
          <EasyEdit
            type="text"
            className={s.valueInput}
            value={data.fullName || data.name}
            placeholder={data.fullName}
            hideCancelButton
            hideSaveButton
            saveOnBlur
            cssClassPrefix="profile-card-"
            onSave={(val: string) => onSave(val, 'name')}
          />
        </li>
        {data.last_contact_time && (
          <li className={s.item}>
            <div className={s.itemTitle}>
              <span>Met</span>
              <Img alt="icon" className={s.pen} img="pen.png" />
            </div>
            <div className={s.value}>{formatTime(data.last_contact_time)}</div>
          </li>
        )}
        {data.last_client_text && (
          <li className={s.item}>
            <div className={s.itemTitle}>
              <span>Last Outreach</span>
              <Img alt="icon" className={s.pen} img="pen.png" />
            </div>
            <div className={classNames(s.value, s.outreach)}>
              {data.last_client_text}
            </div>
          </li>
        )}
      </ul>
      <Button className={s.button} variant="outlined">
        Remove from Recommendations
      </Button>
    </div>
  )
}

const s = css`
  .container {
    padding-bottom: 25px;
  }

  .list {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .item {
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

  .button {
    display: block;
    max-width: 247px;
    width: 100%;
    margin: 22px auto 0 auto;
  }

  .valueInput {
    background: red;
  }

  .triangle {
    margin-left: 4px;
    border: 5px solid transparent;
    border-top: 6px solid #1966ff;
  }
`

export default TabInfo
