import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import isArray from 'lodash/isArray'
import Typography from '../Typography'
import Button from '../Button'

type Props = {
  className?: string
  reviewData: ContactMutable[]
  title: string
  acceptHandler: (data: ContactMutable) => void
  declineHandler: (data: ContactMutable) => void
  additionHandler?: (data: ContactMutable) => void
}

const UserInfoReview: React.FC<Props> = ({
  className,
  reviewData,
  title,
  acceptHandler,
  declineHandler,
  additionHandler,
}) => {
  return (
    <div className={classNames(s.container, className)}>
      <Typography
        className={s.title}
        styleVariant="body3"
        fontWeight="bold"
        tagVariant="div"
      >
        {title}
      </Typography>

      <ul>
        {reviewData?.map((item) => {
          return (
            <li className={s.item} key={item.data}>
              <div className={s.name}>
                {isArray(item.data) ? item.data.join(' ') : item.data}
              </div>
              <div className={s.actions}>
                <Button
                  className={s.button}
                  variant="outlined"
                  handler={() => acceptHandler(item)}
                >
                  Accept
                </Button>
                <Button
                  className={s.button}
                  variant="outlined"
                  handler={() => declineHandler(item)}
                >
                  Decline
                </Button>
                {additionHandler && (
                  <Button
                    className={s.button}
                    variant="outlined"
                    handler={() => additionHandler(item)}
                  >
                    + Nickname
                  </Button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const s = css`
  .container {
    margin-top: 8px;
    padding: 19px 16px 8px 16px;

    border-left: 2px solid var(--secondary1);
    background: var(--secondary2);
  }

  .name {
    margin-bottom: 8px;
  }

  .title {
    margin-bottom: 22px;
  }

  .item {
    margin-bottom: 16px;
  }

  .actions {
    display: grid;
    grid-template-columns: 2fr 2fr 3fr;
    grid-gap: 6px;
  }

  .button {
    height: 26px;
    padding: 0 12px;
    background: none;

    font-size: 11px;
    font-weight: var(--regular);
  }
`

export default UserInfoReview
