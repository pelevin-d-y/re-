import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import Typography from '../Typography'
import SvgIcon from '../SvgIcon'
import EditField from '../EditField'
import UserInfoReview from './UserInfoReview'
import { LoaderAbsolute } from '../Loader'

type Props = {
  className?: string
  mutableData?: ContactMutable[]
  updateData: UpdateMutableData
  mutableDataType: MutableDataType
  updateDataCallback?: () => void
  label: string
}

const UserInfoItem: React.FC<Props> = ({
  className,
  mutableData,
  updateData,
  updateDataCallback,
  mutableDataType,
  label,
}) => {
  const [reviewData, setReviewData] = useState<null | ContactMutable[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const formatDataValueToDisplay = (data: any) => {
    if (Array.isArray(data)) {
      return data.join(' ')
    }
    return data
  }

  const formatDataValueForApi = (data: any) => {
    if (mutableDataType === 'name') {
      return data?.split(' ') || ['']
    }
    return data
  }

  const primaryData = useMemo(
    () =>
      mutableData?.find((item) => {
        return item.type === mutableDataType && item.meta.type === 'primary'
      }) ||
      mutableData?.find((item) => {
        return item.type === mutableDataType && item.review === 1
      }),
    [mutableData, mutableDataType]
  )

  useEffect(() => {
    const defaultReviewData =
      mutableData?.filter(
        (item) => item.type === mutableDataType && item.review === 0
      ) || null

    if (defaultReviewData && defaultReviewData.length === 1) {
      updateData([
        {
          ...defaultReviewData[0],
          review: 1,
          meta: {
            type: 'primary',
          },
        },
      ])
    }
    if (defaultReviewData && defaultReviewData.length > 1) {
      setReviewData(defaultReviewData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const composeItemForAPI = (
    data: ContactMutable,
    type: 'confirm' | 'delete'
  ): ContactMutable => {
    switch (type) {
      case 'confirm':
        return {
          ...data,
          review: 1,
          meta: {
            ...data.meta,
            type: 'primary',
          },
        }

      case 'delete':
        return { ...data, review: 2 }

      default:
        return data
    }
  }

  const updateConfirmedData = async (data: ContactMutable) => {
    try {
      if (primaryData) {
        await updateData(
          [composeItemForAPI(data, 'confirm')],
          [composeItemForAPI(primaryData, 'delete')],
          updateDataCallback
        )
      } else {
        await updateData(
          [composeItemForAPI(data, 'confirm')],
          undefined,
          updateDataCallback
        )
      }
    } catch (err) {
      setIsLoading(false)
      Promise.reject(err)
    }
  }

  const onSave = (val: string) => {
    updateConfirmedData({
      type: mutableDataType,
      data: formatDataValueForApi(val),
      review: 1,
      meta: {},
    })
  }

  const acceptHandler = async (data: ContactMutable) => {
    setIsLoading(true)
    await updateConfirmedData(data)
    setIsLoading(false)
  }

  const declineHandler = async (data: ContactMutable) => {
    setIsLoading(true)
    await updateData([composeItemForAPI(data, 'delete')])
    setIsLoading(false)
  }

  return (
    <div className={classNames(s.container, className)}>
      {isLoading && <LoaderAbsolute />}
      <div className={s.title}>
        <span>
          <Typography styleVariant="body2">{label}</Typography>
        </span>
        <SvgIcon className={s.pen} icon="pen.svg" />
      </div>
      <EditField
        type="text"
        value={primaryData?.data && formatDataValueToDisplay(primaryData.data)}
        classPrefix="profile-card-"
        placeholder=" "
        onSave={(val: string) => onSave(val)}
      />
      {reviewData && reviewData?.length > 0 && (
        <UserInfoReview
          reviewData={reviewData}
          title={`We detected ${reviewData.length} values`}
          acceptHandler={acceptHandler}
          declineHandler={declineHandler}
        />
      )}
    </div>
  )
}

const s = css`
  .container {
    position: relative;
  }

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

export default UserInfoItem
