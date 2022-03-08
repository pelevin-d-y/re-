import { chunk } from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { get, post } from 'src/api'
import { fetchDataQueue } from 'src/helpers/utils/fetchDataQueue'
import formatContactData from 'src/helpers/utils/format-contact-data'

type ActionState = {
  type: 'delete' | 'add' | null
  idsToDelete: string[]
  idsToAdd: string[]
}

type Action =
  | { type: 'UPDATE_PINNED_DATA'; payload: FormattedContact[] }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }
  | { type: 'UPDATE_PINNED_IDS'; payload: string[] }
  | { type: 'DO_ACTION'; payload: ActionState }

type State = {
  data: FormattedContact[]
  isLoading: boolean
  ids: string[]
  actionState: ActionState
}
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  addPinned: (data: string) => any
  removePinned: (data: string) => any
  clearPinned: () => any
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
    case 'DO_ACTION': {
      return {
        ...state,
        actionState: action.payload,
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
        actionState: {
          type: null,
          idsToDelete: [],
          idsToAdd: [],
        },
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
    actionState: {
      type: null,
      idsToDelete: [],
      idsToAdd: [],
    },
  })

  const getPinnedData = React.useCallback(async () => {
    const ids: string[] = await get.getPinnedContacts()
    dispatch({ type: 'UPDATE_PINNED_IDS', payload: ids })

    try {
      let usersData: React.SetStateAction<FormattedContact[] | undefined> = []

      const contactsChunks = chunk(ids, 90)
      const requests = contactsChunks.map((contactChunk) => {
        return () => get.getContactsMutable(contactChunk)
      })

      const responses = await fetchDataQueue(requests)

      if (responses.length <= 0) {
        usersData = []
      } else {
        const convertedContactsRespToObj = responses.reduce((acc, item) => {
          return { ...acc, ...item }
        })
        usersData = Object.entries(convertedContactsRespToObj).map(
          ([id, contact]) => formatContactData(contact, id)
        )
      }

      dispatch({
        type: 'UPDATE_PINNED_DATA',
        payload: usersData,
      })
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

  useEffect(() => {
    const updatePinnedStore = async () => {
      if (state.actionState.type === 'delete') {
        await post.postPinnedContacts(
          state.ids.filter((item) => {
            return !state.actionState.idsToDelete.includes(item)
          })
        )
        await getPinnedData().then(() => {
          dispatch({
            type: 'DO_ACTION',
            payload: {
              ...state.actionState,
              type: null,
              idsToDelete: [],
            },
          })
        })
      }

      if (state.actionState.type === 'add') {
        await post.postPinnedContacts([
          ...state.ids,
          ...state.actionState.idsToAdd,
        ])
        await getPinnedData().then(() => {
          dispatch({
            type: 'DO_ACTION',
            payload: {
              ...state.actionState,
              type: null,
              idsToAdd: [],
            },
          })
        })
      }
    }
    updatePinnedStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.actionState])

  const addPinned = useCallback(
    async (data: string) => {
      dispatch({
        type: 'DO_ACTION',
        payload: {
          ...state.actionState,
          type: 'add',
          idsToAdd: [...state.actionState.idsToAdd, data],
        },
      })
    },
    [state.actionState]
  )

  const removePinned = useCallback(
    async (data: string) => {
      dispatch({
        type: 'DO_ACTION',
        payload: {
          ...state.actionState,
          type: 'delete',
          idsToDelete: [...state.actionState.idsToDelete, data],
        },
      })

      return null
    },
    [state.actionState]
  )

  const clearPinned = useCallback(async () => {
    dispatch({
      type: 'DO_ACTION',
      payload: {
        ...state.actionState,
        type: 'delete',
        idsToDelete: [...state.ids],
      },
    })

    return null
  }, [state])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      addPinned,
      removePinned,
      clearPinned,
      dispatch,
    }),
    [addPinned, clearPinned, removePinned, state]
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
