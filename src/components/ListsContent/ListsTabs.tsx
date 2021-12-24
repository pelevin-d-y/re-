import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import ListsCatalog from './ListsCatalog'
import { usePlaylists } from '../context/PlaylistsContext'
import Button from '../shared-ui/Button'
import { usePopup } from '../context/PopupContext'

type Props = {
  className?: string
}

const ListsTabs: React.FC<Props> = ({ className }) => {
  const {
    state: { data: lists },
  } = usePlaylists()

  const { dispatch: popupDispatch } = usePopup()

  const toggleCreateListModal = () => {
    popupDispatch({ type: 'TOGGLE_CREATE_LIST_POPUP' })
  }

  return (
    <div className={classNames(className, s.container)}>
      <ReactTabs>
        <TabList className={s.tabs}>
          <div className={s.tabsContainer}>
            <Tab className={s.tabItem}>Lists</Tab>
            <Tab className={s.tabItem}>Recommended</Tab>
            <Tab className={s.tabItem}>Urgent</Tab>
            <Tab className={s.tabItem}>Pinned</Tab>
            <Tab className={s.tabItem}>Starred</Tab>
          </div>
          <Button
            className={s.button}
            variant="outlined"
            handler={toggleCreateListModal}
          >
            +
          </Button>
        </TabList>
        <TabPanel>
          <ListsCatalog data={lists} />
        </TabPanel>
        <TabPanel>
          <ListsCatalog data={[]} />
        </TabPanel>
        <TabPanel>
          <ListsCatalog data={[]} />
        </TabPanel>
        <TabPanel>
          <ListsCatalog data={[]} />
        </TabPanel>
        <TabPanel>
          <ListsCatalog data={[]} />
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
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0;
    border-bottom: 1px solid #dddddd;

    @include mobile {
      overflow: scroll;
    }
  }

  .tabsContainer {
    display: flex;
  }

  .tabItem {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
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

  .button {
    border: none;

    &:hover {
      background: #fff;
      color: var(--blue);
    }
  }
`

export default ListsTabs
