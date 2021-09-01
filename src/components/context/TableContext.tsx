import * as React from 'react'
import { getContactsMutable, getPlaylist, postPlaylists } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { useRouter } from 'next/router'

type Action =
  | { type: 'UPDATE_LIST'; payload: any }
  | { type: 'UPDATE_SELECTED_USERS'; payload: any[] }
type State = {
  data: Playlist | null
  selected: any[]
}
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
  getPlaylistData: () => void
  updateList: (list: any) => void
  updateSelectedUsers: (users: any[]) => void
  removeUsers: (userData: any) => void
}

const TableContext = React.createContext<ContextType | null>(null)

const tableReducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'UPDATE_LIST': {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'UPDATE_SELECTED_USERS': {
      return {
        ...state,
        selected: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const TableProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = React.useReducer(tableReducer, {
    data: null,
    selected: [],
  })

  const updateList = (list: any) => {
    dispatch({ type: 'UPDATE_LIST', payload: list })
  }

  const updateSelectedUsers = (list: any) => {
    dispatch({ type: 'UPDATE_SELECTED_USERS', payload: list })
  }

  const getPlaylistData = React.useCallback(async () => {
    try {
      const playlist: any = await getPlaylist(router.query.id as string)
      const newPlaylist = playlist.data[0]

      const contacts: any = await Promise.all(
        newPlaylist.contacts.map((item: any) =>
          getContactsMutable(item.contact_id)
        )
      )
      newPlaylist.contacts = contacts.map((contact: any) =>
        formatContactData(
          Object.values(contact.data)[0] as any,
          Object.keys(contact.data)[0]
        )
      )
      updateList(newPlaylist)
    } catch (err) {
      console.log('getPlaylistData err =>', err)
    }
  }, [router.query.id])

  const removeUsers = React.useCallback(
    (users: any[]) => {
      if (state.data?.id) {
        postPlaylists([
          {
            id: state.data.id,
            contacts: users.map((item) => ({
              contact_id: item.id,
              review: 2,
            })),
          },
        ])
          .then(() => getPlaylistData())
          .catch((err: any) => console.log('removeUser err =>', err))
      }
    },
    [state.data?.id, getPlaylistData]
  )

  React.useEffect(() => {
    if (router.query.id && !state.data) {
      getPlaylistData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      updateList,
      getPlaylistData,
      updateSelectedUsers,
      removeUsers,
    }),
    [getPlaylistData, state, removeUsers]
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

const useTable = (): ContextType => {
  const context = React.useContext(TableContext)
  if (context === null) {
    throw new Error('useTable must be used within a TableProvider')
  }
  return context
}

export { TableProvider, useTable }
