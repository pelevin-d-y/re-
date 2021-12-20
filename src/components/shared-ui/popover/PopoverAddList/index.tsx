import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import Popover from '../PopoverBase'
import CardContainer from '../../cards/CardContainer'
import Search from '../../Search'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import _ from 'lodash'
import SearchList from '../../SearchList'

type Props = {
  className?: string
  user_data: UserData
  lists: FormattedListData[]
}

const PopoverAddList: React.FC<Props> = ({ className, user_data, lists }) => {
  const { state } = usePlaylists()

  const filteredList = _.differenceWith(state.data, lists)

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
            inputPlaceholder={`Search list to ${user_data.name} add to...`}
          />
          <div className={s.header}>Recommendation</div>
          <div className={s.lists}>
            {filteredList?.map((item) => (
              <SearchList data={item} />
            ))}
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
`

export default PopoverAddList
