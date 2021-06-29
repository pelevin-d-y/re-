import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import format from 'date-fns/format'

type Props = {
  className?: string
  data: UserData
}

const InfoTab: React.FC<Props> = ({ className, data }) => (
  <div className={classNames(s.container, className)}>
    <div className={s.tabs}>
      <div className={s.tabItem}>Info</div>
    </div>
    <ul className={s.list}>
      <li className={s.item}>
        <div className={s.itemTitle}>
          <span>Email</span>
          <img
            alt="icon"
            className={s.pen}
            src={require('public/images/pen.png')}
          />
        </div>
        <div className={s.value}>{data.address}</div>
      </li>
      {data.last_contact_time && (
        <li className={s.item}>
          <div className={s.itemTitle}>
            <span>Met</span>
            <img
              alt="icon"
              className={s.pen}
              src={require('public/images/pen.png')}
            />
          </div>
          <div className={s.value}>
            {format(new Date(data.last_contact_time), 'MMMM dd, yyyy')}
          </div>
        </li>
      )}
      <li className={s.item}>
        <div className={s.itemTitle}>
          <span>Last Outreach</span>
          <img
            alt="icon"
            className={s.pen}
            src={require('public/images/pen.png')}
          />
        </div>
        <div className={classNames(s.value, s.outreach)}>
          {data.last_client_text}
        </div>
      </li>
    </ul>
  </div>
)

const s = css`
  .tabs {
    padding-left: 20px;
    padding-right: 20px;
  }

  .tabItem {
    display: inline-block;
    min-width: 63px;
    border-bottom: 4px solid #000000;

    text-align: center;
    font-size: 14px;
    line-height: 31px;
    font-weight: var(--bold);
  }

  .list {
    width: 100%;
    padding: 0;
    margin: 0;
    border-top: 1px solid #dddddd;
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
`

export default InfoTab
