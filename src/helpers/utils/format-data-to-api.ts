type Keys =
  | 'email'
  | 'primaryEmail'
  | 'name_short'
  | 'name'
  | 'image'
  | 'company'
  | 'title'
  | 'phone'
  | 'Notes'

type Data = {
  [key in Keys]?: string | string[]
}

const keys = [
  'email',
  'primaryEmail',
  'name_short',
  'name',
  'image',
  'company',
  'title',
  'phone',
  'Notes',
]

const checkIsKeysContainKey = (key: string) =>
  !keys.find((item) => item === key)

export const formatDataForApi = (
  data: Data,
  previousData: Data
): {
  newValue: {
    type: string
    data: string | string[]
    review: number
  }[]
  previousValue: {
    type: string
    data: string | string[]
    review: number
  }[]
} => {
  const newValue = Object.entries(data).map(([key, value]) => {
    if (checkIsKeysContainKey(key)) {
      throw new Error(`unsupported key newValue! ==> ${key}`)
    }
    return {
      type: key,
      data: value,
      review: 1,
    }
  })

  const previousValue = Object.entries(previousData).map(([key, value]) => {
    if (checkIsKeysContainKey(key)) {
      throw new Error(`unsupported key previousValues! ==> ${key}`)
    }

    return {
      type: key,
      data: value,
      review: 2,
    }
  })

  return { newValue, previousValue }
}
