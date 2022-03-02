import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import isArray from 'lodash/isArray'
import Typography from '../Typography'
import SvgIcon from '../SvgIcon'
import EditField from '../EditField'
import Button from '../Button'

type Props = {
  className?: string
  mutableData?: ContactMutable[]
  updateData: UpdateMutableData
  updateDataCallback?: () => void
}

const UserInfoName: React.FC<Props> = ({
  className,
  mutableData,
  updateData,
  updateDataCallback,
}) => {
  const unreviewedNames = useMemo(() => {
    return mutableData?.filter(
      (item) => item.type === 'name' && item.review === 0
    )
  }, [mutableData])

  const primaryNameData = useMemo(
    () =>
      mutableData?.find((item) => {
        return item.type === 'name' && item.meta.type === 'primary'
      }) || mutableData?.find((item) => item.type === 'name'),
    [mutableData]
  )

  const onSaveName = (val: string) => {
    if (primaryNameData) {
      updateData(
        [
          {
            ...primaryNameData,
            data: val.split(' '),
            review: 1,
            meta: {
              ...primaryNameData.meta,
              type: 'primary',
            },
          },
        ],
        [{ ...primaryNameData, review: 2 }],
        updateDataCallback
      )
    } else {
      updateData(
        [
          {
            type: 'name',
            data: val.split(' '),
            review: 1,
            meta: {
              type: 'primary',
            },
          },
        ],
        [],
        updateDataCallback
      )
    }
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.title}>
        <span>
          <Typography styleVariant="body2">Name </Typography>
        </span>
        <SvgIcon className={s.pen} icon="pen.svg" />
      </div>
      <EditField
        type="text"
        value={primaryNameData?.data.join(' ') || ''}
        classPrefix="profile-card-"
        onSave={(val: string) => onSaveName(val)}
      />

      <div className={s.confirmation}>
        <Typography
          className={s.confirmationTitle}
          styleVariant="body3"
          fontWeight="bold"
          tagVariant="div"
        >
          We detect {unreviewedNames?.length} name changes
        </Typography>

        <ul>
          {unreviewedNames?.map((item) => {
            return (
              <li className={s.item} key={item.data}>
                <div className={s.name}>
                  {isArray(item.data) ? item.data.join(' ') : null}
                </div>
                <div className={s.actions}>
                  <Button className={s.button} variant="outlined">
                    Accept
                  </Button>
                  <Button className={s.button} variant="outlined">
                    Decline
                  </Button>
                  <Button className={s.button} variant="outlined">
                    + Nickname
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const s = css`
  .title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 10px;
    white-space: nowrap;
    color: #adadad;
  }

  .pen {
    width: 15px;
    height: 13px;

    opacity: 0;
  }

  .confirmation {
    margin-top: 8px;
    padding: 19px 16px 8px 16px;

    border-left: 2px solid var(--secondary1);
    background: var(--secondary2);
  }

  .confirmationTitle {
    margin-bottom: 22px;
  }

  .item {
    margin-bottom: 16px;
  }

  .name {
    margin-bottom: 10px;
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

export default UserInfoName
