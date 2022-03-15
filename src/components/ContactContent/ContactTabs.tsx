import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import formatContactData from 'src/helpers/utils/format-contact-data'
import TabNotes from '../shared-ui/popover/PopoverUserInfo/TabNotes'
import { UpdateMutableData } from '../HOCs/HOCUpdateMutableData'
import TabLists from '../shared-ui/popover/PopoverUserInfo/TabLists'
import Typography from '../shared-ui/Typography'
import TabRecs from '../shared-ui/popover/PopoverUserInfo/TabRecs'

type Props = {
  className?: string
  updateData: UpdateMutableData
  mutableData?: ContactMutable[]
  id: string
}

const ContactTabs: React.FC<Props> = ({
  className,
  mutableData,
  updateData,
  id,
}) => {
  const data = mutableData ? formatContactData(mutableData, id) : null
  return (
    <div className={classNames(className, s.container)}>
      <ReactTabs>
        <TabList className={s.tabs}>
          <Tab className={s.tabItem}>
            <Typography styleVariant="body1" fontVariant="inter">
              Lists
            </Typography>
          </Tab>
          <Tab className={s.tabItem}>
            <Typography styleVariant="body1" fontVariant="inter">
              Recs
            </Typography>
          </Tab>
          <Tab className={s.tabItem}>
            <Typography styleVariant="body1" fontVariant="inter">
              Notes
            </Typography>
          </Tab>
        </TabList>
        <TabPanel>{data && <TabLists data={data} />}</TabPanel>
        <TabPanel>{data && <TabRecs data={data} />}</TabPanel>
        <TabPanel>
          <TabNotes
            className={s.tabNotes}
            updateData={updateData}
            mutableData={mutableData}
          />
        </TabPanel>
      </ReactTabs>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 25px 0px 25px;
    width: 100%;
  }

  .tabs {
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0;
    border-bottom: 1px solid #dddddd;
    justify-content: space-between;
  }

  .tabItem {
    display: inline-block;
    white-space: nowrap;
    max-width: 100px;
    width: 100%;
    border-bottom: 2px solid transparent;
    text-align: center;
    color: #c7c7c7;
    cursor: pointer;
    padding: 10px;
  }

  .tabItem[aria-selected='true'] {
    color: var(--shades1);
    border-bottom: 2px solid var(--shades1);
  }

  .panel {
    padding: 16px;
  }

  .tabNotes {
    padding-bottom: 0;
  }
`

export default ContactTabs
