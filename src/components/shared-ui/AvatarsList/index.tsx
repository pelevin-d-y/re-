import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
  users: PlaylistContact[]
  avatarWidth?: number
  avatarHeight?: number
  showHiddenUsers?: boolean
}

const AVATAR_BASE_SIZE = 52
const MAX_VISIBLE_USERS = 6
const AVATAR_TRANSITION = 10

const AvatarsList: React.FC<Props> = ({
  className,
  users,
  avatarWidth,
  avatarHeight,
  showHiddenUsers,
}) => {
  const { state: clientState } = useClient()
  const visibleUsers = users.slice(0, MAX_VISIBLE_USERS)
  const hiddenUsers = users.length - MAX_VISIBLE_USERS
  const avatarWidthWithBorder = (avatarWidth || AVATAR_BASE_SIZE) + 4 // 4 - border-width
  const containerWidth =
    avatarWidthWithBorder * visibleUsers.length -
    AVATAR_TRANSITION * (visibleUsers.length - 1)
  const getAvatar = (id: string) => {
    if (id && clientState.data?.clientId) {
      return `https://strata-cc-client-public.s3.amazonaws.com/contacts_images/${clientState.data.clientId}/${id}.jpg`
    }
    return null
  }

  return (
    <div className={classNames(className, s.container)}>
      <div
        className={classNames(s.container)}
        style={{ width: containerWidth }}
      >
        {visibleUsers.map((item, index) => {
          return (
            <div
              key={item.contact_id || index}
              style={{
                transform: `translateX(-${index * AVATAR_TRANSITION}px)`,
              }}
            >
              <Avatar
                className={s.avatarImage}
                name=""
                width={avatarWidth || AVATAR_BASE_SIZE}
                height={avatarHeight || AVATAR_BASE_SIZE}
                image={getAvatar(item.contact_id)}
              />
            </div>
          )
        })}
      </div>
      {hiddenUsers <= 0 || !showHiddenUsers ? null : (
        <div className={s.hiddenUsers}>{hiddenUsers} +</div>
      )}
    </div>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .avatars {
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
  }

  .avatarImage {
    width: 52px;
    height: 52px;
    border: 2px solid var(--shades2);
  }

  .hiddenUsers {
    margin-left: 14px;

    font-size: 14px;
    line-height: 16px;
    font-weight: var(--bold);
    color: var(--primary1);
  }
`

export default AvatarsList
