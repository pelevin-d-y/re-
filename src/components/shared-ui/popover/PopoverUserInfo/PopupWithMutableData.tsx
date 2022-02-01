import { HOCUpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import PopupContent from './PopupContent'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
  buttonHandler: () => void
}

const PopupWithMutableData: React.FC<Props> = ({ data, buttonHandler }) => {
  const PopupContentWithMutableData = HOCUpdateMutableData({
    WrappedComponent: PopupContent,
    id: data.contact_id,
  })
  return (
    <PopupContentWithMutableData data={data} buttonHandler={buttonHandler} />
  )
}

export default PopupWithMutableData
