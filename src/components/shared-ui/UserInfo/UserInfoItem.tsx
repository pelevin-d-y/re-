import React, { useMemo, useState } from 'react'
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
  const [newMutableData, setNewMutableData] = useState<null | ContactMutable[]>(
    null
  )

  const [isLoading, setIsLoading] = useState(false)

  const formatDataValueToDisplay = (data: any) => {
    if (Array.isArray(data)) {
      return data.join(' ')
    }
    return data
  }

  const formatDataValueForApi = (data: any) => {
    if (mutableDataType === 'name') {
      return data.split(' ') || ['']
    }
    return data
  }

  const unreviewedData = useMemo(() => {
    let composedArray: ContactMutable[] = []

    const defaultUnreviewedNames = mutableData?.filter(
      (item) => item.type === mutableDataType && item.review === 0
    )
    if (newMutableData) {
      composedArray = [...newMutableData, ...composedArray]
    }
    if (defaultUnreviewedNames) {
      composedArray = [...composedArray, ...defaultUnreviewedNames]
    }
    return composedArray
  }, [mutableData, mutableDataType, newMutableData])

  const primaryNameData = useMemo(
    () =>
      mutableData?.find((item) => {
        return item.type === mutableDataType && item.meta.type === 'primary'
      }) || mutableData?.find((item) => item.type === mutableDataType),
    [mutableData, mutableDataType]
  )

  const onSave = (val: string) => {
    const stateValue = newMutableData
      ? [
          ...newMutableData,
          {
            type: mutableDataType,
            data: formatDataValueForApi(val),
            review: 1,
            meta: {},
          },
        ]
      : [
          {
            type: mutableDataType,
            data: formatDataValueForApi(val),
            review: 1,
            meta: {},
          },
        ]

    setNewMutableData(stateValue)
  }

  const acceptHandler = async (data: ContactMutable) => {
    setIsLoading(true)
    try {
      if (primaryNameData) {
        await updateData(
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
        await updateData(
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

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.warn('acceptHandler error ==>', err)
    }
  }

  const declineHandler = async (data: ContactMutable) => {
    setIsLoading(true)
    await updateData([{ ...data, review: 2 }])
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
        value={
          primaryNameData?.data &&
          formatDataValueToDisplay(primaryNameData.data)
        }
        classPrefix="profile-card-"
        placeholder=" "
        onSave={(val: string) => onSave(val)}
      />
      {!!unreviewedData?.length && (
        <UserInfoReview
          unreviewedData={unreviewedData}
          title={`We detect ${unreviewedData.length} name changes`}
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
