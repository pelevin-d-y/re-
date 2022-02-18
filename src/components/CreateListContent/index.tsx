import React from 'react'
import { css } from 'astroturf'

import ListHeader from 'src/components/shared-ui/ListHeader'

const Content: React.FC = () => (
  <div className={s.container}>
    <ListHeader data={{}} />
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--shades2);
  }
`

export default Content
