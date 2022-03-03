import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import Typography from '../Typography'
import SvgIcon from '../SvgIcon'
import EditField from '../EditField'
import UserInfoReview from './UserInfoReview'

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
  const [newName, setNewName] = useState<null | string>(null)

  const unreviewedNames = useMemo(() => {
    const newNameData = newName
      ? {
          type: 'name',
          data: newName.split(' ') || [''],
          meta: {
            type: 'primary',
          },
          review: 1,
        }
      : null

    let composeArray: ContactMutable[] = []

    const defaultUnreviewedNames = mutableData?.filter(
      (item) => item.type === 'name' && item.review === 0
    )

    if (newNameData) {
      composeArray.push(newNameData)
    }
    if (defaultUnreviewedNames) {
      composeArray = [...composeArray, ...defaultUnreviewedNames]
    }
    return composeArray
  }, [mutableData, newName])

  const primaryNameData = useMemo(
    () =>
      mutableData?.find((item) => {
        return item.type === 'name' && item.meta.type === 'primary'
      }) || mutableData?.find((item) => item.type === 'name'),
    [mutableData]
  )

  const onSave = (val: string) => {
    setNewName(val)
  }

  const acceptHandler = async (data: ContactMutable) => {
    if (primaryNameData) {
      updateData(
        [
          {
            ...data,
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
            ...data,
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

  const declineHandler = async (data: ContactMutable) => {
    await updateData([{ ...data, review: 2 }])
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
        value={
          primaryNameData?.data
            ? primaryNameData?.data?.join(' ')
            : primaryNameData?.data
        }
        classPrefix="profile-card-"
        placeholder=" "
        // onSave={(val: string) => onSaveName(val)}
        onSave={(val: string) => onSave(val)}
      />
      {!!unreviewedNames?.length && (
        <UserInfoReview
          unreviewedData={unreviewedNames}
          title={`We detect ${unreviewedNames.length} name changes`}
          acceptHandler={acceptHandler}
          declineHandler={declineHandler}
        />
      )}
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
`

export default UserInfoName
