import { HOCUpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import PopupContent from './PopupContent'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
  buttonHandler: () => void
  updateDataCallback?: () => void
}

const PopupWithMutableData: React.FC<Props> = ({
  data,
  buttonHandler,
  updateDataCallback,
}) => {
  const PopupContentWithMutableData = HOCUpdateMutableData({
    WrappedComponent: PopupContent,
    id: data.contact_id,
  })
  return (
    <PopupContentWithMutableData
      data={data}
      buttonHandler={buttonHandler}
      updateDataCallback={updateDataCallback}
    />
  )
}

export default PopupWithMutableData
