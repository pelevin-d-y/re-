type BaseMutableDataArgs = {
  type: string
  data: string | string[]
  review?: number
  meta?: any
}

const getBaseMutableData = ({
  data,
  review = 1,
  type,
  meta = {},
}: BaseMutableDataArgs): ContactMutable => ({
  data,
  review,
  type,
  meta,
})
export { getBaseMutableData }
