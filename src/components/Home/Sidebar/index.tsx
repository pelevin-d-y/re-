import React from 'react'
import { css } from 'astroturf'
import Metrics from 'src/components/shared-ui/Metrics'
import ImportantSteps from 'src/components/shared-ui/ImportantSteps'
import classNames from 'classnames'

type Props = {
  className?: string
}

const ContentSidebar: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <Metrics className={s.metrics} />
    <ImportantSteps />
  </div>
)

const s = css`
  .container {
    width: 30%;
    height: 100vh;

    border-radius: 10px;
  }

  .metrics {
    margin-bottom: 10px;
  }
`

export default ContentSidebar
