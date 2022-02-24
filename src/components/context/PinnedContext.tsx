import { chunk } from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { get, post } from 'src/api'
import { fetchDataQueue } from 'src/helpers/utils/fetchDataQueue'
import formatContactData from 'src/helpers/utils/format-contact-data'

type Action =
  | { type: 'UPDATE_PINNED_DATA'; payload: FormattedContact[] }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }
  | { type: 'UPDATE_PINNED_IDS'; payload: string[] }
type State = { data: FormattedContact[]; isLoading: boolean; ids: string[] }
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  addPinned: (data: string) => any
  removePinned: (data: string) => any
  dispatch: Dispatch
}

const PinnedContext = React.createContext<ContextType | null>(null)

const pinnedReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_PINNED_IDS': {
      return {
        ...state,
        ids: action.payload,
      }
    }
    case 'UPDATE_PINNED_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'UPDATE_IS_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    default: {
      return {
        ids: [],
        data: [],
        isLoading: false,
      }
    }
  }
}

const PinnedProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(pinnedReducer, {
    ids: [],
    data: [],
    isLoading: false,
  })

  const getPinnedData = React.useCallback(async () => {
    const ids: string[] = await get.getPinnedContacts()
    dispatch({ type: 'UPDATE_PINNED_IDS', payload: ids })

    try {
      let usersData: React.SetStateAction<FormattedContact[] | undefined> = []
      if (ids && ids.length > 0) {
        const contactsChunks = chunk(ids, 90)
        const requests = contactsChunks.map((contactChunk) => {
          return () => get.getContactsMutable(contactChunk)
        })

        const responses = await fetchDataQueue(requests)
        const convertedContactsRespToObj = responses.reduce((acc, item) => {
          return { ...acc, ...item }
        })
        usersData = Object.entries(convertedContactsRespToObj).map(
          ([id, contact]) => formatContactData(contact, id)
        )

        dispatch({
          type: 'UPDATE_PINNED_DATA',
          payload: usersData,
        })
      }
    } catch (error) {
      console.log('getUsersData ==>', error)
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'UPDATE_IS_LOADING', payload: true })
      await getPinnedData()
      dispatch({ type: 'UPDATE_IS_LOADING', payload: false })
    }
    fetchData()
  }, [getPinnedData])

  const addPinned = useCallback(
    async (data: string) => {
      if (state.ids.find((item) => data === item)) {
        return null
      }
      await post.postPinnedContacts([...state.ids, data])
      await getPinnedData()
      return null
    },
    [getPinnedData, state.ids]
  )

  const removePinned = useCallback(
    async (data: string) => {
      await post.postPinnedContacts(state.ids.filter((item) => item !== data))
      await getPinnedData()
      return null
    },
    [getPinnedData, state.ids]
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      addPinned,
      removePinned,
      dispatch,
    }),
    [addPinned, removePinned, state]
  )

  return (
    <PinnedContext.Provider value={value}>{children}</PinnedContext.Provider>
  )
}

const usePinned = (): ContextType => {
  const context = React.useContext(PinnedContext)
  if (context === null) {
    throw new Error('usePinned must be used within a PinnedProvider')
  }
  return context
}

export { PinnedProvider, usePinned }
