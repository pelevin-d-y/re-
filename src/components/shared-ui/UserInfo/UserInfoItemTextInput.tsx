import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import EditField from '../EditField'
import { LoaderAbsolute } from '../Loader'
import UserInfoReview from './UserInfoReview'
import { UpdateDataCallback } from '.'

type Props = {
  className?: string
  mutableData?: ContactMutable[]
  updateData: UpdateMutableData
  mutableDataType: MutableDataType
  updateDataCallback?: UpdateDataCallback
  id: string
}

const formatDataValueToDisplay = (data: any) => {
  if (Array.isArray(data)) {
    return data.join(' ')
  }
  return data
}

const formatDataValueForApi = (data: any, mutableDataType: string) => {
  if (mutableDataType === 'name') {
    return data?.split(' ') || ['']
  }
  return data
}

const composeItemForAPI = (
  data: ContactMutable,
  type?: 'confirm' | 'delete'
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

const UserInfoItemTextInput: React.FC<Props> = ({
  className,
  mutableData,
  updateData,
  mutableDataType,
  updateDataCallback,
  id,
}) => {
  const [reviewData, setReviewData] = useState<ContactMutable[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const primaryData = useMemo(() => {
    const primary = mutableData?.filter((item) => {
      return item.type === mutableDataType && item.meta.type === 'primary'
    })

    if (primary && primary?.length > 0) {
      return primary
    }

    return []
  }, [mutableData, mutableDataType])

  const confirmedData = useMemo(() => {
    const confirmed = mutableData?.filter((item) => {
      return item.type === mutableDataType && item.review === 1
    })

    if (confirmed && confirmed.length > 0) {
      return confirmed
    }
    return []
  }, [mutableData, mutableDataType])

  const updateConfirmedData = async (data: ContactMutable) => {
    try {
      await updateData(
        [composeItemForAPI(data, 'confirm')],
        [
          ...primaryData.map((item) => composeItemForAPI(item, 'delete')),
          ...reviewData.map((item) => composeItemForAPI(item, 'delete')),
        ],
        () => (updateDataCallback ? updateDataCallback(id) : null)
      )
    } catch (err) {
      setIsLoading(false)
      Promise.reject(err)
    }
  }

  useEffect(() => {
    const defaultReviewData = mutableData?.filter(
      (item) => item.type === mutableDataType && item.review === 0
    )

    if (primaryData.length === 0) {
      if (defaultReviewData && defaultReviewData.length === 1) {
        updateData([composeItemForAPI(defaultReviewData[0], 'confirm')])
      }

      if (defaultReviewData && defaultReviewData.length > 1) {
        setReviewData(defaultReviewData)
      }
    }

    if (
      defaultReviewData &&
      defaultReviewData.length > 0 &&
      primaryData.length > 0
    ) {
      updateData(
        defaultReviewData.map((item) => composeItemForAPI(item, 'delete'))
      )
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
      data: formatDataValueForApi(val, mutableDataType),
      review: 1,
      meta: {},
    })
  }

  const getFieldValue = () => {
    if (primaryData.length > 0) {
      return (
        primaryData[0]?.data && formatDataValueToDisplay(primaryData[0].data)
      )
    }
    if (confirmedData.length > 0) {
      return (
        confirmedData[0]?.data &&
        formatDataValueToDisplay(confirmedData[0].data)
      )
    }

    return ''
  }

  return (
    <>
      {isLoading && <LoaderAbsolute />}
      <EditField
        type="text"
        value={getFieldValue()}
        classPrefix="profile-card-"
        placeholder=" "
        onSave={(val: string) => onSave(val)}
      />
      {reviewData && reviewData?.length > 1 && (
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
