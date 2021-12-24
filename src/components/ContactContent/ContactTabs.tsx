import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import { apiHelpers, get, post } from 'src/api/requests'
import ContactLists from './ContactLists'
import ContactNextSteps from './ContactNextSteps'
import TabNotes from '../shared-ui/popover/PopoverUserInfo/TabNotes'

type Props = {
  className?: string
  data: UserData
}

const ContactTabs: React.FC<Props> = ({ className, data }) => {
  const [mutableData, setMutableData] = useState<ContactMutable[] | undefined>(
    undefined
  )

  useEffect(() => {
    get.getContactsMutable([data.contact_id]).then((res) => {
      setMutableData(Object.values(res)[0])
    })
  }, [data.contact_id])

  const updateMutableData = async (
    newVal: ContactMutable,
    prevVal?: ContactMutable
  ) => {
    try {
      await apiHelpers.updateMutableData(data.contact_id, newVal, prevVal)
      const contactMutableRes = await get.getContactsMutable([data.contact_id])
      setMutableData(Object.values(contactMutableRes)[0])
    } catch (err) {
      console.warn('updateMutableData ==>', err)
    }
  }

  return (
    <div className={classNames(className, s.container)}>
      <ReactTabs>
        <TabList className={s.tabs}>
          <Tab className={s.tabItem}>Next Steps</Tab>
          <Tab className={s.tabItem}>Lists</Tab>
          <Tab className={s.tabItem}>Notes</Tab>
        </TabList>
        <TabPanel>
          <ContactNextSteps />
        </TabPanel>
        <TabPanel>
          <ContactLists data={data} />
        </TabPanel>
        <TabPanel>
          <TabNotes data={mutableData} updateApiData={updateMutableData} />
        </TabPanel>
      </ReactTabs>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 37px 24px 47px 18px;
    width: 100%;
  }

  .tabs {
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0;
    border-bottom: 1px solid #dddddd;
  }

  .tabItem {
    display: inline-block;
    white-space: nowrap;
    max-width: 100px;
    width: 100%;
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

export default ContactTabs
