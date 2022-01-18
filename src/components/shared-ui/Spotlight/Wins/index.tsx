import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Award from './Award'

type Props = {
  className?: string
}

const Awards = [
  {
    title: 'award-1',
    image: 'award-1.png',
  },
  {
    title: 'award-2',
    image: 'award-2.png',
  },
  {
    title: 'award-3',
    image: 'award-3.png',
  },
  {
    title: 'award-4',
    image: 'award-4.png',
  },
  {
    title: 'award-5',
    image: 'award-5.png',
  },
]

const Wins: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(className, s.container)}>
    <div className={s.header}>Wins</div>
    <div className={s.awards}>
      {Awards.map((item) => (
        <Award className={s.award} data={item} key={item.title} />
      ))}
    </div>
  </CardContainer>
)

const s = css`
  .container {
    padding: 16px 17px;
  }

  .header {
    font-size: 12px;
    color: #c5c5c5;
    font-weight: var(--semiBold);
  }

  .awards {
    display: flex;
    flex-flow: row wrap;
    margin-left: -11px;
  }

  .award {
    margin-left: 11px;
    margin-top: 11px;
  }
`

export default Wins
