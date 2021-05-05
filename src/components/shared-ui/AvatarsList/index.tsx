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

const AvatarList: React.FC<Props> = ({
  className,
  users,
  avatarWidth,
  avatarHeight,
}) => (
  <div className={classNames(className, s.container)}>
    {users.map((item, index) => (
      <div
        className={s.avatar}
        key={item.id || index}
        style={{ transform: `translateX(-${index * 10}px)` }}
      >
        <Avatar
          className={s.avatarImage}
          width={avatarWidth || 52}
          height={avatarHeight || 52}
          image={require(`public/images/${item.avatar}`)}
        />
      </div>
    ))}
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
  }

  .avatarImage {
    width: 52px;
    height: 52px;
    border: 2px solid var(--white);
  }
`

export default AvatarList
