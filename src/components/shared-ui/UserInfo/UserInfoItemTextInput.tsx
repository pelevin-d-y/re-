import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import EditField from '../EditField'
import { LoaderAbsolute } from '../Loader'
import UserInfoReview from './UserInfoReview'

type Props = {
  className?: string
  mutableData?: ContactMutable[]
  updateData: UpdateMutableData
  mutableDataType: MutableDataType
  updateDataCallback?: (id: string) => void
  id: string
}

const formatDataValueToDisplay = (data: any) => {
  if (Array.isArray(data)) {
    return data.join(' ')
  }
  return data
}

const UserInfoItemTextInput: React.FC<Props> = ({
  className,
  mutableData,
  updateData,
  mutableDataType,
  updateDataCallback,
  id,
}) => {
  const [reviewData, setReviewData] = useState<null | ContactMutable[]>([])
  const [isLoading, setIsLoading] = useState(false)

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

  const formatDataValueForApi = (data: any) => {
    if (mutableDataType === 'name') {
      return data?.split(' ') || ['']
    }
    return data
  }

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
          () => (updateDataCallback ? updateDataCallback(id) : null)
        )
      } else {
        await updateData(
          [composeItemForAPI(data, 'confirm')],
          undefined,
          () => () => updateDataCallback ? updateDataCallback(id) : null
        )
      }
    } catch (err) {
      setIsLoading(false)
      Promise.reject(err)
    }
  }

  useEffect(() => {
    const defaultReviewData =
      mutableData?.filter(
        (item) => item.type === mutableDataType && item.review === 0
      ) || null

    if (defaultReviewData && defaultReviewData.length === 1) {
      updateData(
        [
          {
            ...defaultReviewData[0],
            review: 1,
            meta: {
              type: 'primary',
            },
          },
        ],
        undefined,
        () => () => updateDataCallback ? updateDataCallback(id) : null
      )
    }
    if (defaultReviewData && defaultReviewData.length > 1) {
      setReviewData(defaultReviewData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const onSave = (val: string) => {
    updateConfirmedData({
      type: mutableDataType,
      data: formatDataValueForApi(val),
      review: 1,
      meta: {},
    })
  }

  return (
    <>
      {isLoading && <LoaderAbsolute />}
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
    </>
  )
}

const s = css`
  .container {
  }
`

export default UserInfoItemTextInput
