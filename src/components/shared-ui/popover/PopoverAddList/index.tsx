import React, { useEffect, useState } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import _ from 'lodash'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import Popover from '../PopoverBase'
import CardContainer from '../../cards/CardContainer'
import Search from '../../Search'
import SearchList from '../../SearchList'

type Props = {
  className?: string
  user: UserData
  lists: FormattedListData[]
}

const PopoverAddList: React.FC<Props> = ({ className, user, lists }) => {
  const { state } = usePlaylists()

  const [filteredList, setFilteredList] = useState<FormattedListData[]>()

  useEffect(() => {
    setFilteredList(_.differenceWith(state.data, lists))
  }, [state, lists])

  return (
    <Popover
      showPopupEvent="click"
      position="bottom right"
      triggerElement={
        <Button className={classNames(className, s.list)} variant="outlined">
          +
        </Button>
      }
      popupContent={
        <CardContainer className={classNames(s.card, className)}>
          <Search
            classes={{ container: s.searchContainer, input: s.searchInput }}
            inputPlaceholder={`Search list to ${user.name} add to...`}
          />
          <div className={s.header}>Recommendation</div>
          <div className={s.lists}>
            {filteredList?.length !== 0 ? (
              filteredList?.map((item) => (
                <SearchList key={item?.id} data={item} user={user} />
              ))
            ) : (
              <div className={s.empty}>Empty</div>
            )}
          </div>
        </CardContainer>
      }
    />
  )
}

const s = css`
  .popup {
    padding: 18px 20px;
    padding-bottom: 0;
    max-height: 350px;
    background: var(--white);
  }

  .list {
    border: none;

    &:hover {
      background: #fff;
      color: var(--blue);
    }
  }

  .card {
    padding: 16px 22px 33px 16px;
    min-width: 480px;
  }

  .searchContainer {
    margin-bottom: 22px;
  }

  .header {
    font-size: 16px;
    font-weight: normal;
    line-height: 31px;
    color: #808080;
    margin-bottom: 5px;
  }

  .empty {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 31px;
    margin-bottom: 5px;
  }
`

export default PopoverAddList
