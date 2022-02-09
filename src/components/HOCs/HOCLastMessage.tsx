import {
  useEffect,
  useState,
  ComponentType,
  useRef,
  forwardRef,
  ReactElement,
} from 'react'
import { useInView } from 'react-intersection-observer'
import { get } from 'src/api'
import formatLastMessage from 'src/helpers/utils/format-last-message'
import getLastMessage from 'src/helpers/utils/get-last-message'

type Props = {
  className?: string
  id: string
  children(
    lastMessageData: any,
    isLoading: boolean,
    ref: React.ForwardedRef<any>
  ): ReactElement
}

const HOCLastMessage: React.FC<Props> = ({ children, id }) => {
  const { ref, inView } = useInView()

  const [isLoading, setIsLoading] = useState(false)
  const [lastMessageData, setLastMessageData] = useState<any>(null)

  useEffect(() => {
    if (inView && !lastMessageData) {
      const fetchLastEmail = async () => {
        setIsLoading(true)
        await get
          .getLastEmails([id])
          .then((res) => {
            const lastMessageResponse = getLastMessage(res[id])
            const contactLastMessage = formatLastMessage(lastMessageResponse)
            setLastMessageData(contactLastMessage)
            setIsLoading(false)
          })
          .catch((err) => {
            if (err.response.status === 502) {
              fetchLastEmail()
            }
            setIsLoading(false)
          })
      }
      fetchLastEmail()
    }
  }, [id, inView, lastMessageData])

  return children(lastMessageData, isLoading, ref)
}

export { HOCLastMessage }
