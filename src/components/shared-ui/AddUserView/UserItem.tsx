import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'
import Button from 'src/components/shared-ui/Button'
import { getName } from 'src/helpers/utils/get-name'
import { LoaderAbsolute } from '../Loader'

type Props = {
  className?: string
  data: FormattedContact
  handler: (user: FormattedContact) => void
}

const UserItem: React.FC<Props> = ({ className, data, handler }) => {
  const [isLoading, setIsLoading] = useState(false)

  const name = getName(data)

  return (
    <li className={classNames(s.container, className)}>
      <div className={s.profile}>
        <Avatar className={s.avatar} name={name} image={data.avatar} />
        <span className={s.name}>{name}</span>
      </div>
      <Button
        className={s.button}
        variant="outlined"
        handler={async () => {
          setIsLoading(true)
          await handler(data)
          setIsLoading(false)
        }}
      >
        Add
      </Button>
      {isLoading && <LoaderAbsolute />}
    </li>
  )
}

const s = css`
  .container {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 22px;
    border-bottom: 1px solid var(--neutral5);
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .avatar {
    margin-right: 22px;
  }

  .name {
    font-size: 14px;
    line-height: 17px;
    font-weight: var(--bold);
  }
`

export default UserItem
