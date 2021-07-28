import React, { useMemo } from 'react'
import { useClient } from 'src/components/context/ClientContext'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'
import EmptyRecommendations from './EmptyRecommendations'
import FullRecommendations from './FullRecommendations'

type Props = {
  className?: string
}

const HomeRecommendations: React.FC<Props> = ({ className }) => {
  const { state } = useClient()

  const contacts = useMemo(() => state?.contacts?.slice(1, 4), [state])

  return (
    <CardContainer className={classNames(className, s.container)}>
      {!contacts ? (
        <FullRecommendations data={contacts} />
      ) : (
        <EmptyRecommendations />
      )}
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    overflow: hidden;
    position: relative;
    padding: 22px 30px 40px 30px;
    background: url('/svg/circles-background.svg') no-repeat center/cover;

    @include mobile {
      padding: 22px;
    }
  }
`

export default HomeRecommendations
