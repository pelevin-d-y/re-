import classNames from 'classnames'
import { css } from 'astroturf'
import format from 'date-fns/format'
import Img from 'src/components/shared-ui/Img'
import Button from 'src/components/shared-ui/Button'
import React from 'react'

type Props = {
  className?: string
  data: UserData
}

const TabInfo: React.FC<Props> = ({ className, data }) => (
  <div className={classNames(s.container, className)}>
    <ul className={s.list}>
      <li className={s.item}>
        <div className={s.itemTitle}>
          <span>Email</span>
          <Img alt="icon" className={s.pen} img="pen.png" />
        </div>
        <div className={s.value}>{data.address}</div>
      </li>
      {data.last_contact_time && (
        <li className={s.item}>
          <div className={s.itemTitle}>
            <span>Met</span>
            <Img alt="icon" className={s.pen} img="pen.png" />
          </div>
          <div className={s.value}>
            {format(new Date(data.last_contact_time), 'MMMM dd, yyyy')}
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
`

export default TabInfo
