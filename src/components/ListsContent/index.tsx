import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import { useClient } from '../context/ClientContext'
import { LoaderAbsolute } from '../shared-ui/Loader'
import CardContainer from '../shared-ui/cards/CardContainer'
import SectionHeader from '../shared-ui/SectionHeader'
import Button from '../shared-ui/Button'
import { usePopup } from '../context/PopupContext'
import ListsCatalog from './ListsCatalog'
import { usePlaylists } from '../context/PlaylistsContext'

type Props = {
  className?: string
}

const ListsContent: React.FC<Props> = ({ className }) => {
  const { state } = useClient()

  const {
    state: { data: lists },
  } = usePlaylists()

  const { dispatch: popupDispatch } = usePopup()

  const toggleCreateListModal = () => {
    popupDispatch({ type: 'TOGGLE_CREATE_LIST_POPUP' })
  }

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.main}>
        {state.data?.contacts ? (
          <CardContainer>
            <div className={s.header}>
              <SectionHeader
                data={state.data.contacts}
                title="Contacts"
                description="Search your contacts to create lists"
                icon="contacts"
                iconBackground="#F0F5FF"
                iconColor="#1966FF"
                hideNumber
                link={{ text: 'View', href: '/contacts' }}
              />
              <div className={s.buttonContainer}>
                <Button
                  className={s.button}
                  variant="outlined"
                  handler={toggleCreateListModal}
                >
                  + Create New List
                </Button>
              </div>
            </div>
            <ListsCatalog data={lists} />
          </CardContainer>
        ) : (
          <div className={s.loader}>
            <LoaderAbsolute />
          </div>
        )}
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    flex-flow: row nowrap;
    display: flex;
    padding: 10px 14px 14px;
  }

  .main {
    max-width: 1200px;
    width: 100%;
    padding: 0 12px 12px 0;
    margin-left: auto;
    margin-right: auto;
    @include tablet {
      width: 100%;
      padding: 0;
    }
  }

  .loader {
    position: relative;
    height: 100px;
  }

  .header {
    display: flex;
    justify-content: space-between;

    @include mobile {
      flex-direction: column;
    }
  }

  .buttonContainer {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 22px 21px 22px 25px;

    @include mobile {
      justify-content: center;
    }
  }

  .button {
    width: max-content;
  }
`

export default ListsContent
