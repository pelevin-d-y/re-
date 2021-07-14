import React, { useState, useEffect } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import Search from 'src/components/shared-ui/Search'
import Avatar from 'src/components/shared-ui/Avatar'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import PopoverActions from 'src/components/shared-ui/popover/PopoverActions'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import classNames from 'classnames'
import ModalBase from '../ModalBase'
import ModalClose from '../../Close'
import ModalSendingListHeader from '../ModalHeader'

const playlists: Playlists = [
  'Meetings & Events',
  'Follow Ups',
  'Birthdays',
  'New Roles',
  'Time Lapsed: 90 Days',
  'Time Lapsed: 1 Year',
  'Travel: Who to Meet',
  'Relocation',
  'Holidays',
  'Share Strata',
  'Checking Emails',
  'Intros received',
  'Network Engagement',
  'Network Maintenance',
]

const testUsers: UserData[] = [
  {
    id: 1,
    avatar: 'gino.jpeg',
    name: 'Landon Tucker',
    position: 'Founder at Company X',
    event: 'Asked a question',
    lastMessage:
      'Landon intro-ed Ari Kieth last week, follow up with Landon on how the meeting went with her.',
  },
  {
    id: 2,
    avatar: 'maker.jpeg',
    name: 'Taylor Smith',
    position: 'Founder at Company X',
    event: 'Taylor is based in LA',
    lastMessage:
      'Mary asked you for the All Hands presentation from last week’s Town Hall. Send it over!',
  },
  {
    id: 3,
    avatar: 'mary.jpeg',
    name: 'Gino Mo',
    position: 'Founder at Company X',
    event: 'Gino took you to dinner',
    lastMessage:
      'Gino asked if you’re free next week to grab dinner in the east village. Set a date!',
  },
  {
    id: 4,
    avatar: 'james.png',
    name: 'James Malone',
    position: 'Founder at Company X',
    event: 'James is based in LA',
    lastMessage:
      'Question: “What is the valuation of company X if they were to raise another round at $X?”',
  },
  {
    id: 5,
    avatar: 'phil.jpeg',
    name: 'Mary Smith',
    position: 'Founder at Company X',
    event: 'Mary has a startup in LA',
    lastMessage:
      'Gino asked if you’re free next week to grab dinner in the east village. Set a date!',
  },
  {
    id: 6,
    avatar: 'steve.jpeg',
    name: 'Steve Lee',
    position: 'Founder at Company X',
    event: 'Requested deck',
    lastMessage:
      'Thank Steve for sharing his works during the Creative Soundable last Wednesday.',
  },
  {
    id: 7,
    avatar: 'maker.jpeg',
    name: 'Phil Hoyt',
    position: 'Founder at Company X',
    event: 'Asked for Dinner',
    lastMessage:
      'Thank Steve for sharing his works during the Creative Soundable last Wednesday.',
  },
]

const RecommendationsModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { recommendationsIsOpen } = state
  const [subscribedPlaylist, setSubscribedPlaylist] = useState<Playlists>([])

  useEffect(() => {
    setSubscribedPlaylist(playlists)
  }, [])
  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_RECOMMENDATIONS_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={recommendationsIsOpen}
      onClose={closeHandler}
    >
      <ModalClose className={s.close} handler={closeHandler} />
      <div className={s.sidebar}>
        <div className={s.searchContainer}>
          <Search
            classes={{ container: s.search, input: s.searchInput }}
            inputPlaceholder="Search playlists…"
          />
        </div>
        <div className={s.subscribed}>
          <div className={s.playlistTitle}>Subscribed Playlists</div>
          <ul className={classNames(s.playlists, s.subscribedPlaylists)}>
            {subscribedPlaylist.map((item) => (
              <li key={item}>
                <button className={s.playlistButton} type="button">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.content}>
        <ModalSendingListHeader
          className={s.modalHeader}
          name="Recommendations"
          title="Meetings & Events"
          image="lists.svg"
        />
        <div className={s.subheader}>
          <div className={s.filter} />
          <div className={s.subheaderText}>Select bulk send</div>
        </div>
        {testUsers.map((item) => (
          <div className={s.userItem} key={item.id}>
            <Avatar
              className={s.avatar}
              image={item.avatar}
              width={70}
              height={70}
            />
            <div className={s.userInfo}>
              <span className={s.userName}>{item.name}</span>
              <span className={s.userEvent}>
                <ColorfulCircle className={s.circle} color="red" /> {item.event}
              </span>
              <div className={s.lastMessage}>{item.lastMessage}</div>
            </div>
            <div className={s.actions}>
              <PopoverDots className={s.actionDots} variant="outlined" />
              <PopoverActions
                className={s.actionRate}
                variant="contained"
                buttonClickHandler={() => null}
              >
                Follow Up
              </PopoverActions>
            </div>
          </div>
        ))}
      </div>
    </ModalBase>
  )
}

const s = css`
  .container {
    max-width: 1055px;
    display: grid;
    grid-template-columns: 2fr 4fr;
  }

  .sidebar {
    border-right: 1px solid #d0d0d0;
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .close {
    position: absolute;
    z-index: 20;
    top: 23px;
    right: 24px;
  }

  .searchContainer {
    padding-left: 30px;
    padding-right: 24px;
    margin-bottom: 32px;
  }

  .searchInput {
    width: 100%;
  }

  .subscribedTitle {
    padding-left: 33px;
    padding-right: 24px;
    margin-bottom: 19px;
  }

  .playlistTitle {
    padding-left: 33px;
    margin-bottom: 19px;
    margin-top: 32px;

    line-height: 17px;
    color: #acacac;
  }

  .playlists {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .subscribedPlaylists {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(
        to bottom,
        #ff4949 25%,
        #3ea9ff 25% 45%,
        #1966ff 45% 65%,
        #0e1148 60% 80%
      );
    }
  }

  .playlistButton {
    position: relative;
    padding: 11px 12px 12px 33px;
    width: 100%;

    font-size: 18px;
    line-height: 21px;
    text-align: left;
    font-weight: var(--bold);
    background: var(--white);
    border: none;
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }
  }

  .playlistJoin {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    cursor: auto;
    padding-right: 73px;

    &:hover {
      background: var(--white);
    }
  }

  .joinButton {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }

  .modalHeader {
    color: #ff2d92;
  }

  .subheader {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    margin-bottom: 20px;
  }

  .subheaderText {
    color: var(--blue);
    font-weight: var(--semibold);
    line-height: 31px;
  }

  .content {
    padding: 29px 30px 0;
  }

  .userItem {
    display: flex;
    flex-flow: row nowrap;
    padding-top: 17px;
    padding-bottom: 29px;
  }

  .circle {
    margin-right: 6px;
  }

  .userInfo {
    max-width: 310px;
    width: 100%;
    margin-right: 18px;
  }

  .avatar {
    width: 70px;
    height: 70px;
    margin-right: 26px;
  }

  .userName {
    margin-right: 20px;

    font-size: 18px;
    line-height: 21px;
    font-weight: var(--bold);
  }

  .lastMessage {
    margin-top: 17px;
    padding: 11px 7px 14px 17px;
    background: #f8f8f8;

    font-size: 12px;
    line-height: 14px;
  }

  .actions {
    max-width: 200px;
    width: 100%;

    margin-left: auto;
    text-align: right;
  }

  .actionDots {
    width: 60px;
    margin-bottom: 15px;
  }

  .actionRate {
    max-width: 220px;
    width: 100%;
  }
`

export default RecommendationsModal
