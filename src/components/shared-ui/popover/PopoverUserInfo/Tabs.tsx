import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import TabInfo from './TabInfo'
import TabLists from './TabLists'
import TabRecs from './TabRecs'

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
        <TabInfo data={data} />
      </TabPanel>
      <TabPanel>
        <TabLists data={data} />
      </TabPanel>
      <TabPanel>
        <TabRecs />
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
`

export default InfoTab
