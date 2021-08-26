import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import Img from 'src/components/shared-ui/Img'
import Button from 'src/components/shared-ui/Button'
import EasyEdit from 'react-easy-edit'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
  data: UserData
}

const TabInfo: React.FC<Props> = ({ className, data }) => {
  const { state: clientState, updateUserData } = useClient()

  const onSave = (val: string, type: 'address' | 'name') => {
    const updatedContacts = clientState?.contacts?.map((item: UserData) => {
      if (item.address === data.address) {
        return {
          ...item,
          [type]: val,
        }
      }
      return item
    })

    updateUserData({ ...clientState, contacts: updatedContacts })
  }

  return (
    <div className={classNames(s.container, className)}>
      <ul className={s.list}>
        <li className={s.item}>
          <div className={s.itemTitle}>
            <span>Email</span>
            <Img alt="icon" className={s.pen} img="pen.png" />
          </div>
          <EasyEdit
            type="text"
            className={s.valueInput}
            value={data.address}
            placeholder={data.address}
            hideCancelButton
            hideSaveButton
            saveOnBlur
            onValidate={(value: string) => {
              const re =
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return re.test(value)
            }}
            cssClassPrefix="profile-card-"
            onSave={(val: string) => onSave(val, 'address')}
          />
        </li>
        <li className={s.item}>
          <div className={s.itemTitle}>
            <span>Name</span>
            <Img alt="icon" className={s.pen} img="pen.png" />
          </div>
          <EasyEdit
            type="text"
            className={s.valueInput}
            value={data.name}
            placeholder={data.name}
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
            <div className={s.value}>
              {format(parseISO(data.last_contact_time), 'MMMM dd, yyyy')}
            </div>
          </li>
        )}
        <li className={s.item}>
          <div className={s.itemTitle}>
            <span>Last Outreach</span>
            <Img alt="icon" className={s.pen} img="pen.png" />
          </div>
          <div className={classNames(s.value, s.outreach)}>
            {data.last_client_text}
          </div>
        </li>
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
`

export default TabInfo
