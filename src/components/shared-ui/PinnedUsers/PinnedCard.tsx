import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { useClient } from 'src/components/context/ClientContext'
import CardContainer from '../cards/CardContainer'
import Avatar from '../Avatar'
import { TagUser } from '../Tags'
import Checkbox from '../Checkbox'

type Props = {
  className?: string
  data?: UserData | null
  template?: Template
}

const PinnedCard: React.FC<Props> = ({ className, data }) => {
  const { state: statePopup, dispatch: dispatchPopup } = usePopup()

  const handleCheck = (value: boolean) => {
    const isContainedUser = !!statePopup?.dataMulti?.find(
      (item) => item.contact_id === data?.contact_id
    )
    if (value) {
      if (isContainedUser) {
        return null
      }

      const contacts = statePopup.dataMulti || []
      return dispatchPopup({
        type: 'UPDATE_POPUP_DATA_MULTI',
        payload: [...contacts, data as UserData],
      })
    }
    const contacts =
      statePopup?.dataMulti?.filter(
        (item) => !(item.contact_id === data?.contact_id)
      ) || []

    return dispatchPopup({
      type: 'UPDATE_POPUP_DATA_MULTI',
      payload: contacts,
    })
  }

  return data ? (
    <CardContainer className={classNames(className, s.container)}>
      <Checkbox
        className={s.checkbox}
        id={data.contact_id}
        handler={handleCheck}
      />
      <Avatar
        className={s.avatar}
        width={38}
        height={38}
        image={data.avatar}
        strength={data.relationshipStrength}
      />
      <div className={s.info}>
        <div className={s.name}>{data.name}</div>
        <TagUser text="Old friends" />
      </div>
    </CardContainer>
  ) : null
}

const s = css`
  .container {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 18px 50px 20px 20px;
  }

  .avatar {
    flex: 0 0 auto;
    margin-right: 14px;
  }

  .info {
    width: 100%;

    font-size: 12px;
    line-height: 14px;
  }

  .name {
    margin-bottom: 5px;
    font-weight: var(--bold);
  }

  .pin {
    position: absolute;
    top: 17px;
    right: 9px;

    margin-left: auto;
  }

  .checkbox {
    margin-right: 19px;
  }
`

export default PinnedCard
