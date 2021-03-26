import React from 'react'
import { css } from 'astroturf'
import Metrics from 'src/components/shared-ui/Metrics'

const ContentSidebar: React.FC = () => (
  <div className={s.container}>
    <Metrics />
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
