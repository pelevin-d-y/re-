import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { getBaseMutableData } from 'src/helpers/utils/base-mutable-data'
import * as yup from 'yup'
import { UpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import EmailPopover from './EmailPopover'
import EditField from '../EditField'
import { LoaderAbsolute } from '../Loader'
import UserInfoReview from './UserInfoReview'

type Props = {
  className?: string
  data: ContactMutable[]
  updateApiData: UpdateMutableData
}

const schema = yup.string().email()

const UserInfoEmail: React.FC<Props> = ({ className, data, updateApiData }) => {
  const [reviewData, setReviewData] = useState<null | ContactMutable[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const emails: ContactMutable[] | undefined = data?.filter(
    (item) => item.type === 'email'
  )

  const primaryEmail = useMemo(
    () =>
      data?.find(
        (item) => item.type === 'email' && item.meta.type === 'primary'
      ) || emails[0],
    [data, emails]
  )

  const emailsWithPrimary = useMemo(
    () =>
      emails.map((item) => ({
        ...item,
        status:
          item.data === primaryEmail.data
            ? 'Primary'
            : ('Set Primary' as 'Primary' | 'Set Primary'),
      })),
    [emails, primaryEmail?.data]
  )

  useEffect(() => {
    const defaultReviewData =
      data?.filter((item) => item.type === 'email' && item.review === 0) || null

    if (defaultReviewData && defaultReviewData.length === 1) {
      updateApiData([
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

  const setPrimaryEmail = async (emailData: {
    status: 'Primary' | 'Set Primary'
    type: string
    data: string | string[]
    review: number
    meta: any
  }) => {
    setIsLoading(true)
    const currentPrimaryEmail = data?.find(
      (item) => item.meta.type === 'primary'
    )

    const selectedEmail = emails.find(
      (item) => emailData.data === item.data
    ) as ContactMutable

    if (currentPrimaryEmail) {
      await updateApiData([
        {
          ...selectedEmail,
          meta: { ...selectedEmail.meta, type: 'primary' },
        },
        {
          ...currentPrimaryEmail,
          meta: { ...currentPrimaryEmail.meta, type: null },
        },
      ])
    } else {
      await updateApiData([
        {
          ...selectedEmail,
          meta: {
            ...selectedEmail.meta,
            type: 'primary',
          },
        },
      ])
    }

    setIsLoading(false)
  }

  const addEmail = async (value: string) => {
    setIsLoading(true)
    try {
      await schema.validate(value)
      await updateApiData([getBaseMutableData({ data: value, type: 'email' })])
      setIsLoading(false)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err)
      setIsLoading(false)
    }
  }

  const onSave = (val: string) => {
    addEmail(val)
  }

  const acceptHandler = async (acceptData: ContactMutable) => {
    addEmail(acceptData.data)
  }

  const declineHandler = (declineData: ContactMutable) => {
    updateApiData([
      {
        ...declineData,
        review: 2,
      },
    ])
  }

  return (
    <div className={classNames(className, s.container)}>
      <EmailPopover data={emailsWithPrimary} setEmail={setPrimaryEmail} />
      {isLoading && <LoaderAbsolute />}
      {primaryEmail && (
        <EditField
          type="text"
          value={primaryEmail.data as string}
          onSave={(val: string) => {
            onSave(val)
          }}
          classPrefix="profile-card-"
        />
      )}
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

export default UserInfoEmail
