import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import Img from 'src/components/shared-ui/Img'
import PopoverDots from 'src/components/shared-ui/popover/PopoverDots'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import Button from 'src/components/shared-ui/Button'
import { useRouter } from 'next/router'
import CardContainer from '../cards/CardContainer'
import { LoaderComponent } from '../Loader'

type Props = {
  className?: string
  data: FormattedListData
}

const SearchList: React.FC<Props> = ({
  className,
  data: { info, id, contacts },
}) => {
  return (
    <CardContainer className={classNames(s.container, className)}>
      <div className={s.mainInfo}>
        <div className={s.title}>{info?.name}</div>
        {info?.description && (
          <div className={s.description}>{info.description}</div>
        )}
        {contacts && (
          <AvatarsList
            avatarWidth={38}
            avatarHeight={38}
            className={s.avatars}
            users={contacts}
            showHiddenUsers
          />
        )}
      </div>
      <div className={classNames(s.actions)}>
        <Button variant="outlined" handler={() => {}}>
          Add
        </Button>
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding: 11px 16px 25px 21px;
  }

  .title {
    padding-right: 50px;
    color: #000000;
    font-weight: 500;
    font-size: 20px;
    line-height: 42px;
  }

  .description {
    padding-right: 50px;
    color: #000000;
    font-weight: normal;
    font-size: 12px;
    line-height: 22px;
  }

  .tasks {
    margin-top: 7px;
  }

  .avatars {
    margin-top: 15px;
    margin-bottom: 20px;
  }
`

export default SearchList
