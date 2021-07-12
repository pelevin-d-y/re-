import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'

type Props = {
  className?: string
  title: string
}

const PersonalizationSection: React.FC<Props> = ({
  className,
  children,
  title,
}) => (
  <CardContainer className={classNames(className, s.container)}>
    <div className={s.title}>{title}</div>
    {children}
  </CardContainer>
)

const s = css`
  .container {
    width: 100%;
    padding: 34px 28px 49px;
    border-left: 4px solid #0b5cff;
  }

  .title {
    margin-bottom: 22px;

    font-size: 22px;
    line-height: 22px;
    font-weight: var(--bold);
  }
`

export default PersonalizationSection
