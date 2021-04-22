import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'

type Props = {
  className?: string
  users: UserData[]
}

const AvatarList: React.FC<Props> = ({ className, users }) => (
  <div className={classNames(className, s.container)}>
    {users.map((item, index) => (
      <div
        className={s.avatar}
        key={item.id}
        style={{ transform: `translateX(-${index * 10}px)` }}
      >
        <Avatar className={s.avatarImage} image={item.avatar} />
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
    border: 2px solid var(--white);
  }
`

export default AvatarList
