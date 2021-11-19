import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import Avatar from 'src/components/shared-ui/Avatar'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import UserHeader from 'src/components/shared-ui/UserHeader'
import parseMessage from 'src/helpers/utils/parse-message'
import PopoverBase from '../PopoverBase'
import PopoverActionsContent from '../PopoverActionsContent'

type Props = {
  className?: string
}

const TabRecs: React.FC<Props> = ({ className }) => {
  const { state } = useClient()
  const contacts = useMemo(() => state.data?.contacts?.slice(0, 3), [state])

  return (
    <div className={classNames(className, s.container)}>
      <ul>
        {contacts?.map((item) => (
          <li className={s.item} key={item.first_message_id}>
            <CardContainer className={s.card}>
              <Avatar
                image={item.avatar}
                width={49}
                height={49}
                className={s.avatar}
                strength={item.relationshipStrength}
              />
              <div className={s.info}>
                <div className={s.name}>
                  {item.name}{' '}
                  <PopoverBase
                    triggerElement={<div className={s.dots}>•••</div>}
                    popupContent={<PopoverActionsContent />}
                  />
                </div>
                <div className={s.description}>
                  {item.templateData && (
                    <UserHeader
                      text={parseMessage(item.templateData.Subject, item.name)}
                    />
                  )}
                </div>
              </div>
            </CardContainer>
          </li>
        ))}
      </ul>
    </div>
  )
}

const s = css`
  .container {
    padding: 16px 16px 25px 18px;
  }

  .item {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .card {
    display: flex;
    flex-flow: row nowrap;
    padding: 16px 12px 14px 13px;
  }

  .info {
    width: 100%;
    margin-left: 13px;
  }

  .name {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    margin-bottom: 11px;

    font-weight: var(--bold);
  }

  .dots {
    cursor: auto;

    color: var(--blue);
  }
`

export default TabRecs
