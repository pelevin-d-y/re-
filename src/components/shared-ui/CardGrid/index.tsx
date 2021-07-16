import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

type Props = {
  className?: string
  gap?: string
  division: 1 | 2 | 3 | 4
  direction?: 'Column' | 'Row'
}

const Grid: React.FC<Props> = ({
  className,
  children,
  gap,
  division,
  direction,
}) => {
  const styles = {
    [`gridTemplate${direction || 'Column'}s`]:
      division && `repeat(${division || 2}, 1fr)`,
    gap: gap || '13px',
  }
  return (
    <div style={styles} className={classNames(className, s.container)}>
      {children}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: grid;

    @include mobile {
      grid-template-columns: auto !important;
    }
  }
`

export default Grid
