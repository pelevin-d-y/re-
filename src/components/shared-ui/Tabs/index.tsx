import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'

type Props = {
  className?: string
  tabsHeader: string[]
  tabsPanel: string[]
}

const Tabs: React.FC<Props> = ({ className, tabsHeader, tabsPanel }) => {
  const TabsHeaderComponent = tabsHeader.map((item) => (
    <Tab key={item}>{item}</Tab>
  ))

  const TabsPanelComponent = tabsPanel.map((item) => (
    <TabPanel key={item}>{item}</TabPanel>
  ))

  return (
    <ReactTabs className={classNames(s.container, className)}>
      <TabList className={s.tabs}>{TabsHeaderComponent}</TabList>
      {TabsPanelComponent}
    </ReactTabs>
  )
}

const s = css`
  .container {
  }
`

export default Tabs
