import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import { get, post } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { formatDataForApi } from 'src/helpers/utils/format-data-to-api'
import TabInfo from './TabInfo'
import TabLists from './TabLists'
import TabRecs from './TabRecs'
import TabNotes from './TabNotes'

type Props = {
  className?: string
  data: UserData
}

const InfoTab: React.FC<Props> = ({ className, data }) => {
  const [mutableData, setMutableData] = useState<FormattedContacts | undefined>(
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
    <div className={classNames(s.container, className)}>
      <ReactTabs>
        <TabList className={s.tabs}>
          <Tab className={s.tabItem}>Info</Tab>
          <Tab className={s.tabItem}>List</Tab>
          {/* <Tab className={s.tabItem}>Recs</Tab> */}
          <Tab className={s.tabItem}>Notes</Tab>
        </TabList>
        <TabPanel>
          <TabInfo data={mutableData} updateData={updateMutableData} />
        </TabPanel>
        <TabPanel>
          <TabLists data={data} />
        </TabPanel>
        {/* <TabPanel>
          <TabRecs />
        </TabPanel> */}
        <TabPanel>
          <TabNotes data={mutableData} updateData={updateMutableData} />
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
