/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, ReactElement, useRef } from 'react'
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
  const { ref, inView } = useInView({
    delay: 1400,
  })

  const [isLoading, setIsLoading] = useState(false)
  const prevIdRef = useRef(id)
  const [lastMessageData, setLastMessageData] = useState<any>(null)

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

  useEffect(() => {
    if (inView && !lastMessageData) {
      fetchLastEmail()
    }
  }, [id, inView, lastMessageData])

  useEffect(() => {
    if (prevIdRef.current !== id) {
      fetchLastEmail()
      prevIdRef.current = id
    }
  }, [id])

  return children(lastMessageData, isLoading, ref)
}

export { HOCLastMessage }
