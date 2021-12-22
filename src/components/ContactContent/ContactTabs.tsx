import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { get, post } from 'src/api/requests'
import { formatDataForApi } from 'src/helpers/utils/format-data-to-api'
import ContactLists from './ContactLists'
import ContactNextSteps from './ContactNextSteps'
import TabNotes from '../shared-ui/popover/PopoverUserInfo/TabNotes'

type Props = {
  className?: string
  data: UserData
}

const ContactTabs: React.FC<Props> = ({ className, data }) => {
  const [mutableData, setMutableData] = useState<FormattedContact | undefined>(
    undefined
  )

  useEffect(() => {
    get.getContactsMutable([data.contact_id]).then((res) => {
      const formattedData = formatContactData(Object.values(res)[0])
      setMutableData(formattedData)
    })
  }, [data.contact_id])

  const updateMutableData = async (val: string, type: 'name' | 'Notes') => {
    try {
      if (mutableData) {
        let value: string | string[] = val
        if (type === 'name') {
          value = val.split(' ')
        }

        const { newValue, previousValue } = formatDataForApi(
          { [type]: value },
          {
            [type]:
              type === 'name'
                ? mutableData[type]?.split(' ')
                : mutableData[type],
          }
        )

        const body = {
          [data.contact_id]: [...newValue, ...previousValue],
        }

        await post.postContactsMutable(body as any)
        const contactMutableRes = await get.getContactsMutable([
          data.contact_id,
        ])

        const formattedData = formatContactData(
          Object.values(contactMutableRes)[0]
        )
        setMutableData(formattedData)
      }
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
          <TabNotes data={mutableData} updateData={updateMutableData} />
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
