import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import _ from 'lodash'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { useMediaQuery } from 'react-responsive'
import Popover from '../PopoverBase'
import CardContainer from '../../cards/CardContainer'
import Search from '../../Search'
import SearchList from '../../SearchList'

type Props = {
  className?: string
  user: RecommendationUser | FormattedContact
  lists: ListData[]
}

const PopoverAddList: React.FC<Props> = ({ className, user, lists }) => {
  const { state } = usePlaylists()

  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' })

  const [searchText, setSearchText] = useState<string>('')
  const [searchResults, setSearchResults] = useState<ListData[]>()

  useEffect(() => {
    if (state.data) {
      const result = _.differenceWith(state.data, lists).filter(
        (list: ListData) =>
          list.info?.name
            ?.toLocaleLowerCase()
            .includes(searchText.toLowerCase())
      )

      setSearchResults(result)
    }
  }, [state.data, lists, searchText])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const debounceHandleSearch = useMemo(() => _.debounce(handleSearch, 300), [])

  const onCloseHandler = useCallback(() => {
    setSearchText('')
    setSearchResults(_.differenceWith(state.data, lists))
  }, [state.data, lists])

  return (
    <Popover
      showPopupEvent="click"
      position={isDesktop ? 'bottom right' : 'top right'}
      onClose={onCloseHandler}
      triggerElement={
        <Button className={classNames(className, s.button)} variant="outlined">
          +
        </Button>
      }
      popupContent={
        <CardContainer className={classNames(s.card, className)}>
          <Search
            classes={{ container: s.searchContainer, input: s.searchInput }}
            inputPlaceholder={`Search list to ${user.name} add to...`}
            onChange={debounceHandleSearch}
          />
          <div className={s.header}>Recommendation</div>
          <div className={s.lists}>
            {searchResults?.length !== 0 ? (
              searchResults?.map((item) => (
                <SearchList key={item?.playlist_id} data={item} user={user} />
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
  @import 'src/styles/preferences/_mixins.scss';

  .popup {
    padding: 18px 20px;
    padding-bottom: 0;
    max-height: 350px;
    background: var(--white);
  }

  .lists {
    max-height: 320px;
    overflow: scroll;

    @include mobile {
      max-height: 250px;
    }
  }

  .button {
    border: none;

    &:hover {
      background: #fff;
      color: var(--blue);
    }
  }

  .card {
    padding: 16px 22px 33px 16px;
    width: 480px;

    @include mobile {
      width: 280px;
    }
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
