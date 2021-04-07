import React from 'react'
import { css } from 'astroturf'
import Metrics from 'src/components/shared-ui/Metrics'
import ImportantSteps from 'src/components/shared-ui/ImportantSteps'

const ContentSidebar: React.FC = () => (
  <div className={s.container}>
    <Metrics />
    {/* <ImportantSteps /> */}
  </div>
)

const s = css`
  .container {
    width: 30%;
    height: 100vh;

    border-radius: 10px;
  }
`

export default ContentSidebar
