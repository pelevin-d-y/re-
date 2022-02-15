import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import { getNextStep } from 'src/helpers/utils/get-next-step'

type Props = {
  className?: string
  data?: FormattedContact | RecommendationUser
}

const CellNextSteps: React.FC<Props> = ({ className, data }) => {
  const { state } = useClient()

  const nextStep = useMemo(() => {
    if (data && state.data?.name) {
      return getNextStep(data)
    }
    return ''
  }, [data, state.data])

  return <div className={classNames(s.container, className)}>{nextStep}</div>
}

const s = css`
  .container {
    padding: 8px 12px;

    font-size: 12px;
    line-height: 14px;
    background: #fafafa;
  }
`

export default CellNextSteps
