import { useEffect, useState, ComponentType } from 'react'
import { apiHelpers, get } from 'src/api'

type WithUpdateMutableData<T> = {
  WrappedComponent: ComponentType<T>
  data: UserData
}

type GenericType<GT> = Omit<GT, 'mutableData' | 'updateData'>

const HOCUpdateMutableData = <T,>({
  WrappedComponent,
  data,
}: WithUpdateMutableData<T>): ComponentType<GenericType<T>> => {
  const [mutableData, setMutableData] = useState<ContactMutable[] | undefined>(
    undefined
  )

  useEffect(() => {
    get.getContactsMutable([data.contact_id]).then((res) => {
      setMutableData(Object.values(res)[0])
    })
  }, [data.contact_id])

  const updateMutableData = async (
    newVal: ContactMutable,
    prevVal?: ContactMutable
  ) => {
    try {
      await apiHelpers.updateMutableData(data.contact_id, newVal, prevVal)
      const contactMutableRes = await get.getContactsMutable([data.contact_id])
      setMutableData(Object.values(contactMutableRes)[0])
    } catch (err) {
      console.warn('updateMutableData ==>', err)
    }
  }

  const ComponentWithProps = (props: GenericType<T>) => (
    <WrappedComponent
      {...(props as T)}
      mutableData={mutableData}
      updateData={updateMutableData}
    />
  )

  return ComponentWithProps
}

export { HOCUpdateMutableData }
