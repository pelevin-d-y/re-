import React from 'react'
import { css } from 'astroturf'

interface Props {
  className: string
}

const Sidebar = ({className}: Props) => {
  return (
    <div className={className}>
      Sidebar
    </div>
  )
}

const styles = css`
  .sidebar {
    width: 320px;
  }
`

export default Sidebar