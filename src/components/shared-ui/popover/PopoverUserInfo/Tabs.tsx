import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import format from 'date-fns/format'
import Img from 'src/components/shared-ui/Img'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'

type Props = {
  className?: string
  data: UserData
}

const InfoTab: React.FC<Props> = ({ className, data }) => (
  <div className={classNames(s.container, className)}>
    <ReactTabs>
      <TabList className={s.tabs}>
        <Tab className={s.tabItem}>Info</Tab>
        <Tab className={s.tabItem}>List</Tab>
        <Tab className={s.tabItem}>Recs</Tab>
      </TabList>
      <TabPanel>
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
      </TabPanel>
      <TabPanel>
        <div className={s.panel}>LIST</div>
      </TabPanel>
      <TabPanel>
        <div className={s.panel}>RECS</div>
      </TabPanel>
    </ReactTabs>
  </div>
)

const s = css`
  .container {
    min-width: 308px;
  }

  .tabs {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding-left: 20px;
    padding-right: 20px;
    margin: 0;

    border-bottom: 1px solid #dddddd;
  }

  .tabItem {
    display: inline-block;
    min-width: 63px;
    border-bottom: 4px solid transparent;

    text-align: center;
    font-size: 14px;
    line-height: 31px;
    font-weight: var(--bold);
    color: #c7c7c7;
    cursor: pointer;
  }

  .tabItem[aria-selected='true'] {
    color: var(--black);
    border-bottom: 4px solid #000000;
  }

  .panel {
    padding: 16px;
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
`

export default InfoTab
