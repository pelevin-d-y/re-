import React, { useMemo } from 'react'
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

const UserInfoShortName: React.FC<Props> = ({
  className,
  mutableData,
  updateData,
  updateDataCallback,
}) => {
  const unreviewedShortNames = useMemo(() => {
    return mutableData?.filter(
      (item) => item.type === 'name_short' && item.review === 0
    )
  }, [mutableData])

  const primaryShortNameData = useMemo(
    () =>
      mutableData?.find((item) => {
        return item.type === 'name_short' && item.meta.type === 'primary'
      }) || mutableData?.find((item) => item.type === 'name_short'),
    [mutableData]
  )

  const onSaveName = (val: string) => {
    if (primaryShortNameData) {
      updateData(
        [
          {
            ...primaryShortNameData,
            data: val,
            review: 1,
            meta: {
              ...primaryShortNameData.meta,
              type: 'primary',
            },
          },
        ],
        [{ ...primaryShortNameData, review: 2 }],
        updateDataCallback
      )
    } else {
      updateData(
        [
          {
            type: 'name_short',
            data: val?.split(' ') || '',
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

  const acceptHandler = async (data: ContactMutable) => {
    await updateData([{ ...data, review: 1 }])
  }

  const declineHandler = async (data: ContactMutable) => {
    await updateData([{ ...data, review: 2 }])
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.title}>
        <span>
          <Typography styleVariant="body2">Nickname</Typography>
        </span>
        <SvgIcon className={s.pen} icon="pen.svg" />
      </div>
      <EditField
        type="text"
        value={primaryShortNameData?.data}
        placeholder=" "
        classPrefix="profile-card-"
        onSave={(val: string) => onSaveName(val)}
      />
      {!!unreviewedShortNames?.length && (
        <UserInfoReview
          unreviewedData={unreviewedShortNames}
          title={`We detect ${unreviewedShortNames.length} nickname changes`}
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

export default UserInfoShortName
