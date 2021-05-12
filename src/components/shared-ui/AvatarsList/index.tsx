import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'

type Props = {
  className?: string
  users: UserData[]
  avatarWidth?: number
  avatarHeight?: number
}

const AVATAR_BASE_SIZE = 52
const MAX_VISIBLE_USERS = 6
const AVATAR_TRANSITION = 10

const AvatarList: React.FC<Props> = ({
  className,
  users,
  avatarWidth,
  avatarHeight,
}) => {
  const visibleUsers = users.slice(0, MAX_VISIBLE_USERS)
  const hiddenUsers = users.length - MAX_VISIBLE_USERS
  const avatarWidthWithBorder = avatarWidth || AVATAR_BASE_SIZE
  const containerWidth =
    avatarWidthWithBorder * visibleUsers.length -
    AVATAR_TRANSITION * (visibleUsers.length - 1)

  return (
    <div className={classNames(className, s.container)}>
      <div
        className={classNames(s.container)}
        style={{ width: containerWidth }}
      >
        {visibleUsers.map((item, index) => (
          <div
            key={item.id || index}
            style={{ transform: `translateX(-${index * AVATAR_TRANSITION}px)` }}
          >
            <Avatar
              className={s.avatarImage}
              width={avatarWidth || AVATAR_BASE_SIZE}
              height={avatarHeight || AVATAR_BASE_SIZE}
              image={require(`public/images/${item.avatar}`)}
            />
          </div>
        ))}
      </div>
      {hiddenUsers <= 0 ? null : (
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
    border: 2px solid var(--white);
  }

  .hiddenUsers {
    margin-left: 14px;

    font-size: 14px;
    line-height: 16px;
    font-weight: var(--bold);
    color: var(--blue);
  }
`

export default AvatarList
