import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import ImportantCard from './ImportantCard'

interface Props {
  className?: string
}

const ImportantSteps: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(className, s.container)}>
    <div className={s.header}>
      <div className={s.headerText}>
        <div className={s.headerImportant}>Important</div>
        <div className={s.headerNext}>Next Steps</div>
      </div>
      <div className={s.headerStart}>
        <SvgIcon
          className={s.headerStarIcon}
          icon={require('public/svg/star.svg?include')}
        />
      </div>
    </div>
    <div className={s.cards}>
      <ImportantCard />
      <ImportantCard />
      <ImportantCard />
    </div>
  </CardContainer>
)

const s = css`
  .headerText {
    font-size: 24px;
    line-height: 31px;
  }

  .headerNext {
    color: var(--ginger);
  }
`

export default ImportantSteps
