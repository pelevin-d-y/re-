import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import { UserInfo } from '../../UserInfo'
import TabLists from './TabLists'
import TabNotes from './TabNotes'
import Button from '../../Button'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
  updateData: UpdateMutableData
  mutableData: ContactMutable[]
  updateDataCallback?: () => void
}

const TabsContent: React.FC<Props> = ({
  className,
  data,
  mutableData,
  updateData,
  updateDataCallback,
}) => (
  <div className={classNames(s.container, className)}>
    <ReactTabs>
      <TabList className={s.tabs}>
        <Tab className={s.tabItem}>Info</Tab>
        <Tab className={s.tabItem}>List</Tab>
        {/* <Tab className={s.tabItem}>Recs</Tab> */}
        <Tab className={s.tabItem}>Notes</Tab>
      </TabList>
      <TabPanel>
        <UserInfo
          mutableData={mutableData}
          updateData={updateData}
          updateDataCallback={updateDataCallback}
        />
        <div className={s.removeButtonContainer}>
          <Button className={s.removeButton} variant="outlined">
            Remove from Recommendations
          </Button>
        </div>
      </TabPanel>
      <TabPanel>
        <TabLists data={data} />
      </TabPanel>
      {/* <TabPanel>
            <TabRecs />
          </TabPanel> */}
      <TabPanel>
        <TabNotes mutableData={mutableData} updateData={updateData} />
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

  .removeButtonContainer {
    padding-bottom: 25px;
  }

  .removeButton {
    display: block;
    max-width: 247px;
    width: 100%;
    margin: 22px auto 0 auto;
  }
`

export default TabsContent
