import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'
import { useTemplates } from 'src/components/context/TemplatesContext'
import findTemplate from 'src/helpers/utils/find-template'
import PinnedTasksCard from './PinnedTasksCard'

type Props = {
  className?: string
}

const cards = [
  {
    image: require('public/images/gino.jpeg'),
    name: 'Landon Tucker',
    event: 'Follow up on Meetings',
  },
  {
    image: require('public/images/maker.jpeg'),
    name: 'Taylor Smith',
    event: 'Moved to Austin, Texas',
  },
  {
    image: require('public/images/hamburger.jpeg'),
    name: 'Gino Mo',
    event: 'National Cheeseburger Day',
  },
  {
    image: require('public/images/travel.png'),
    name: 'James Malone',
    event: 'Reach out to people in LA while you are there',
  },
]

const PinnedTasks: React.FC<Props> = ({ className }) => {
  const {
    state: { data },
  } = useClient()
  const { state: templatesState } = useTemplates()
  const contacts = data?.contacts?.slice(0, 4)

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.headerText}>
          <div className={s.headerImportant}>Pinned tasks</div>
        </div>
        <div className={s.headerStar}>
          <SvgIcon
            className={s.headerStarIcon}
            icon={require('public/svg/pin.svg?include')}
          />
        </div>
      </div>
      <div className={s.cards}>
        {contacts?.map((item) => (
          <PinnedTasksCard
            className={s.card}
            key={item.first_message_id}
            data={item}
            template={findTemplate(templatesState.data, item.template)}
          />
        ))}
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    padding: 24px 13px 22px 16px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    align-items: center;
  }

  .headerText {
    font-weight: var(--bold);
    font-size: 24px;
    line-height: 31px;
  }

  .headerNext {
    color: var(--ginger);
  }

  .headerStar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 13px;

    border-radius: 50%;
    border: 1px solid #e4e4e4;
  }

  .headerStarIcon {
    width: 23px;
    height: 23px;
    color: var(--blue);
  }

  .cards {
    margin-top: 19px;
  }

  .card {
    margin-bottom: 5px;
  }
`

export default PinnedTasks
