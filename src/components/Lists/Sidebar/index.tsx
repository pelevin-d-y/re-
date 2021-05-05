import React from 'react'
import { css } from 'astroturf'

const ListsSidebar: React.FC = () => <div className={s.container}>Sidebar</div>

const s = css`
  .container {
    width: 30%;
    height: 100vh;

    border-radius: 10px;
  }
`

export default ListsSidebar
