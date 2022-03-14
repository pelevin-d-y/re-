import React from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'

import CloseModal from '../../Close'
import ModalBase from '../ModalBase'
import AvatarsList from '../../AvatarsList'
import TabCreateList from './TabCreateList'
import TabAddToExistingPlaylist from './TabAddToExistingPlaylist'

type Props = {
  className?: string
}

const ModalPinnedContacts: React.FC<Props> = () => {
  const { state, dispatch: popupDispatch } = usePopup()

  const closeHandler = () => {
    popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
  }

  return (
    <ModalBase
      isOpen={state.modalPinnedIsOpen}
      styles={{
        overflow: 'visible',
        maxWidth: '475px',
        padding: '30px 33px 49px',
        minHeight: '462px',
      }}
    >
      <CloseModal handler={closeHandler} className={s.close} />
      <div className={s.content}>
        <div className={s.title}>Add these Contacts</div>
        <div className={s.description}>Manage these contacts in a list</div>
        {state?.dataMulti && (
          <ReactTabs>
            <TabList className={s.tabs}>
              <Tab className={s.tab}>Create new list</Tab>
              <Tab className={s.tab}>Add to existing list</Tab>
            </TabList>
            <div className={s.avatars}>
              {state?.dataMulti && (
                <AvatarsList
                  users={state.dataMulti}
                  avatarWidth={59}
                  avatarHeight={59}
                />
              )}
            </div>
            <TabPanel className={s.tabContent}>
              <TabCreateList users={state.dataMulti} />
            </TabPanel>
            <TabPanel>
              <TabAddToExistingPlaylist users={state.dataMulti} />
            </TabPanel>
          </ReactTabs>
        )}
      </div>
    </ModalBase>
  )
}

const s = css`
  .close {
    position: absolute;
    right: 23px;
    top: 23px;
  }

  .title {
    margin-bottom: 14px;

    font-weight: var(--semiBold);
    font-size: 18px;
    line-height: 21px;
  }

  .description {
    margin-bottom: 15px;

    font-size: 16px;
    line-height: 19px;
  }

  .tabs {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 35px;
  }

  .tab {
    width: 50%;
    padding: 16px;
    cursor: pointer;

    text-align: center;
    font-size: 16px;
    line-height: 19px;
    color: #cbcbcb;
  }

  .tab[aria-selected='true'] {
    color: var(--primary1);
    border-bottom: 4px solid var(--primary1);
  }

  .avatars {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    overflow: auto;

    width: 100%;
    margin-bottom: 28px;
  }

  .emptyState {
    margin-top: 26px;

    font-weight: var(--semiBold);
    font-size: 16px;
  }
`

export default ModalPinnedContacts
