import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardMeetingsEvents from 'src/components/shared-ui/cards/CardMeetingsEvents'
import CardSmall from 'src/components/shared-ui/cards/CardSmall'
import { useClient } from 'src/components/context/ClientContext'

type Props = {
  className?: string
}

const HomeTripleCards: React.FC<Props> = ({ className }) => {
  const {
    state: { data },
  } = useClient()

  const contacts = data?.contacts?.slice(0, 2)

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.left}>
        {contacts?.map((item) => (
          <CardSmall
            data={item}
            key={item.first_message_id}
            template={item.templateData}
            isRow
          />
        ))}
      </div>
      <CardMeetingsEvents />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 13px;

    @include mobile {
      grid-template-columns: auto;
    }
  }

  .left {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10px;
  }

  .userInfo {
    display: flex;
    flex-flow: row nowrap;
  }
`

export default HomeTripleCards
