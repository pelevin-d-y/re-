import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import NextStep from 'src/components/shared-ui/NextStep'
import parseMessage from 'src/helpers/utils/parse-message'
import { usePopup } from 'src/components/context/PopupContext'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
}

const TabRecs: React.FC<Props> = ({ className, data }) => {
  const { state } = useClient()
  const contacts = useMemo(() => state.data?.contacts?.slice(0, 3), [state])
  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }

  return (
    <div className={classNames(className, s.container)}>
      <ul>
        {contacts?.map((item) => (
          <li className={s.item} key={item.first_message_id}>
            <CardContainer className={s.card}>
              <div
                className={s.description}
                onClick={buttonHandler}
                aria-hidden="true"
              >
                {item.message_template_subject && (
                  <NextStep
                    text={parseMessage(
                      item.message_template_subject,
                      item.name
                    )}
                  />
                )}
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
    cursor: pointer;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .card {
    box-shadow: 0px 1px 1px 0px #22222219;
    display: flex;
    flex-flow: row nowrap;
    padding: 16px 12px 14px 13px;
  }

  .dots {
    cursor: auto;

    color: var(--primary1);
  }

  .description {
    width: 100%;
  }
`

export default TabRecs
