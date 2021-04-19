import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'

type Props = {
  className?: string
  users: UserData[]
}

const name: React.FC<Props> = ({ className, users }) => (
  <div className={classNames(className, s.avatars)}>
    {users.map((item, index) => (
      <div
        className={s.avatar}
        key={item.id}
        style={{ transform: `translateX(-${index * 10}px)` }}
      >
        <Avatar image={item.avatar} />
      </div>
    ))}
  </div>
)

const s = css`
  .avatars {
    display: flex;
    flex-flow: row nowrap;
  }
`

export default name
