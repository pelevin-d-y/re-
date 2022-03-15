import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import { UserInfo } from '../../UserInfo'
import TabLists from './TabLists'
import TabNotes from './TabNotes'
import Button from '../../Button'
import Typography from '../../Typography'
import TabRecs from './TabRecs'

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
}) => {
  return (
    <div className={classNames(s.container, className)}>
      <ReactTabs>
        <TabList className={s.tabs}>
          <Tab className={s.tabItem}>
            <Typography styleVariant="body1">Info</Typography>
          </Tab>
          <Tab className={s.tabItem}>
            <Typography styleVariant="body1">List</Typography>
          </Tab>
          <Tab className={s.tabItem}>
            <Typography styleVariant="body1">Recs</Typography>
          </Tab>
          <Tab className={s.tabItem}>
            <Typography styleVariant="body1">Notes</Typography>
          </Tab>
        </TabList>
        <TabPanel>
          <UserInfo
            mutableData={mutableData}
            updateData={updateData}
            updateDataCallback={updateDataCallback}
            id={data.contact_id}
          />
          <div className={s.removeButtonContainer}>
            <Button className={s.removeButton} variant="outlined">
              Don’t recommend contact
            </Button>
          </div>
        </TabPanel>
        <TabPanel>
          <TabLists data={data} />
        </TabPanel>
        <TabPanel>
          <TabRecs data={data} />
        </TabPanel>
        <TabPanel>
          <TabNotes mutableData={mutableData} updateData={updateData} />
        </TabPanel>
      </ReactTabs>
    </div>
  )
}

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
    padding-bottom: 6px;
    border-bottom: 2px solid transparent;

    text-align: center;
    font-size: 14px;
    line-height: 31px;
    color: #c7c7c7;
    cursor: pointer;
  }

  .tabItem[aria-selected='true'] {
    color: var(--shades1);
    border-bottom: 2px solid #000000;
  }

  .panel {
    padding: 16px;
  }

  .removeButtonContainer {
    padding-bottom: 25px;
  }

  .removeButton {
    color: var(--primary1);
    border: 1px solid var(--primary1);
    display: block;
    max-width: 247px;
    width: 100%;
    margin: 22px auto 0 auto;
    &:hover {
      background: var(--primary1);
    }
  }
`

export default TabsContent
