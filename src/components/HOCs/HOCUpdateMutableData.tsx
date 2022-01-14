import { useEffect, useState, ComponentType } from 'react'
import { apiHelpers, get } from 'src/api'

type WithUpdateMutableData<T> = {
  WrappedComponent: ComponentType<T>
  id: string
}

type GenericType<GT> = Omit<GT, 'mutableData' | 'updateData' | 'id'>

export type UpdateMutableData = (
  val: ContactMutable,
  prevVal?: ContactMutable | undefined
) => Promise<void>

const HOCUpdateMutableData = <T,>({
  WrappedComponent,
  id,
}: WithUpdateMutableData<T>): ComponentType<GenericType<T>> => {
  const [mutableData, setMutableData] = useState<ContactMutable[] | undefined>(
    undefined
  )

  useEffect(() => {
    get.getContactsMutable([id]).then((res) => {
      setMutableData(Object.values(res)[0])
    })
  }, [id])

  const updateMutableData = async (
    newVal: ContactMutable,
    prevVal?: ContactMutable
  ) => {
    try {
      await apiHelpers.updateMutableData(id, newVal, prevVal)
      const contactMutableRes = await get.getContactsMutable([id])
      setMutableData(Object.values(contactMutableRes)[0])
    } catch (err) {
      console.warn('updateMutableData ==>', err)
    }
  }

  const ComponentWithProps = (props: GenericType<T>) =>
    mutableData ? (
      <WrappedComponent
        {...(props as T)}
        mutableData={mutableData}
        updateData={updateMutableData}
        id={id}
      />
    ) : null

  return ComponentWithProps
}

export { HOCUpdateMutableData }
