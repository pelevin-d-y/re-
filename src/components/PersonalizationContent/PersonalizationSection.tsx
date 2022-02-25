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
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    width: 100%;
    padding: 34px 28px 49px;
    border-left: 4px solid rgb(32%, 40%, 69%, 0.5);

    &:hover {
      border-left: 4px solid var(--primary1);
    }
  }

  .title {
    margin-bottom: 22px;

    font-size: 22px;
    line-height: 22px;
    font-weight: var(--bold);

    @include mobile {
      text-align: center;
    }
  }
`

export default PersonalizationSection
