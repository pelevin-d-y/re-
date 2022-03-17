import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import * as yup from 'yup'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import SelectPopover from './SelectPopover'
import EditField from '../EditField'
import { LoaderAbsolute } from '../Loader'
import UserInfoReview from './UserInfoReview'
import { UpdateDataCallback } from '.'

type Props = {
  className?: string
  data: ContactMutable[]
  updateApiData: UpdateMutableData
  updateDataCallback?: UpdateDataCallback
  mutableDataType: MutableDataType
  label: string
  id: string
  validationSchema?: any
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

const UserInfoSelect: React.FC<Props> = ({
  className,
  data,
  updateApiData,
  updateDataCallback,
  mutableDataType,
  label,
  id,
  validationSchema,
}) => {
  const [reviewData, setReviewData] = useState<ContactMutable[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const mutableDataConfirmed = useMemo(() => {
    const confirmed = data?.filter((item) => {
      return item.type === mutableDataType && item.review === 1
    })

    if (confirmed && confirmed.length > 0) {
      return confirmed
    }
    return []
  }, [data, mutableDataType])

  const mutableDataPrimary = useMemo(() => {
    const primary = data?.filter((item) => {
      return item.type === mutableDataType && item.meta.type === 'primary'
    })
    if (primary && primary?.length > 0) {
      return primary
    }

    return []
  }, [data, mutableDataType])

  const mutableDataSelect = useMemo(() => {
    if (mutableDataConfirmed.length > 0) {
      return mutableDataConfirmed.map((item) => ({
        ...item,
        status:
          item.meta.type === 'primary'
            ? 'Primary'
            : ('Set Primary' as 'Primary' | 'Set Primary'),
      }))
    }

    return []
  }, [mutableDataConfirmed])

  const updateConfirmedData = async (mutableData: ContactMutable) => {
    try {
      await updateApiData(
        [composeItemForAPI(mutableData, 'confirm')],
        [
          ...mutableDataPrimary.map((item) =>
            composeItemForAPI(item, 'delete')
          ),
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
    const defaultReviewData = data?.filter(
      (item) => item.type === mutableDataType && item.review === 0
    )

    if (mutableDataPrimary.length === 0) {
      if (defaultReviewData && defaultReviewData.length === 1) {
        updateApiData([composeItemForAPI(defaultReviewData[0], 'confirm')])
      }

      if (defaultReviewData && defaultReviewData.length > 1) {
        setReviewData(defaultReviewData)
      }
    }

    if (
      defaultReviewData &&
      defaultReviewData.length > 0 &&
      mutableDataPrimary.length > 0
    ) {
      updateApiData(
        defaultReviewData.map((item) => composeItemForAPI(item, 'delete'))
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setPrimaryMutableItem = async (emailData: {
    status: 'Primary' | 'Set Primary'
    type: string
    data: string | string[]
    review: number
    meta: any
  }) => {
    setIsLoading(true)
    const currentMutableDataPrimary = data?.find(
      (item) => item.meta.type === 'primary'
    )

    const selectedMutableItem = mutableDataConfirmed.find(
      (item) => emailData.data === item.data
    ) as ContactMutable

    if (currentMutableDataPrimary) {
      await updateApiData(
        [
          {
            ...selectedMutableItem,
            meta: { ...selectedMutableItem.meta, type: 'primary' },
          },
          {
            ...currentMutableDataPrimary,
            meta: { ...currentMutableDataPrimary.meta, type: null },
          },
        ],
        undefined,
        () => (updateDataCallback ? updateDataCallback(id) : null)
      )
    } else {
      await updateApiData(
        [
          {
            ...selectedMutableItem,
            meta: {
              ...selectedMutableItem.meta,
              type: 'primary',
            },
          },
        ],
        undefined,
        () => (updateDataCallback ? updateDataCallback(id) : null)
      )
    }

    setIsLoading(false)
  }

  const onSave = async (val: string) => {
    try {
      if (validationSchema) {
        await validationSchema.validate(val)
      }
      const value = formatDataValueForApi(val, mutableDataType)
      if (mutableDataPrimary.length === 0) {
        updateConfirmedData({
          type: mutableDataType,
          data: value,
          review: 1,
          meta: {},
        })
      } else {
        await updateApiData(
          [
            ...mutableDataConfirmed.map((item) => ({
              ...item,
              meta: { ...item.meta, type: null },
            })),
            {
              data: value,
              type: mutableDataType,
              meta: { type: 'primary' },
              review: 1,
            },
          ],
          undefined,
          () => (updateDataCallback ? updateDataCallback(id) : null)
        )
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err)
      setIsLoading(false)
    }
  }

  const acceptHandler = async (acceptData: ContactMutable) => {
    updateConfirmedData(acceptData)
  }

  const declineHandler = (declineData: ContactMutable) => {
    updateApiData([
      {
        ...declineData,
        review: 2,
      },
    ])
  }

  const getFieldValue = () => {
    if (mutableDataPrimary.length > 0) {
      return (
        mutableDataPrimary[0]?.data &&
        formatDataValueToDisplay(mutableDataPrimary[0].data)
      )
    }

    if (mutableDataConfirmed.length > 0) {
      return (
        mutableDataConfirmed[0]?.data &&
        formatDataValueToDisplay(mutableDataConfirmed[0].data)
      )
    }

    return ''
  }

  return (
    <div className={classNames(className, s.container)}>
      <SelectPopover
        data={mutableDataSelect}
        setMutableData={setPrimaryMutableItem}
        label={label}
      />
      {isLoading && <LoaderAbsolute />}
      <EditField
        type="text"
        placeholder=" "
        value={getFieldValue()}
        onSave={(val: string) => {
          const value = val || ''
          onSave(value)
        }}
        classPrefix="profile-card-"
      />
      {reviewData && reviewData?.length > 0 && (
        <UserInfoReview
          reviewData={reviewData}
          title={`We detect ${reviewData.length} name changes`}
          acceptHandler={acceptHandler}
          declineHandler={declineHandler}
        />
      )}
    </div>
  )
}

const s = css`
  .container {
  }
`

export default UserInfoSelect
