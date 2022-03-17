import React, { useState } from 'react'
import { css } from 'astroturf'
import classnames from 'classnames'

type Props = {
  className?: string
  pages: number
  value: number
  onChange: (val: number) => any
}

const PageNavigation: React.FC<Props> = ({
  className,
  pages,
  value,
  onChange,
}) => {
  const [page, setPage] = useState(value)

  const onClick = (selectedPage: number) => {
    setPage(selectedPage)
    onChange(selectedPage)
  }

  return (
    <div className={classnames(className, s.pages)}>
      {Array.from({ length: pages }).map((_, i) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          type="button"
          className={classnames(s.page, {
            [s.active]: i + 1 === page,
          })}
          onClick={() => onClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    width: 80%;
    margin: 18px auto;

    @include mobile {
      width: 100%;
    }
  }

  .page {
    height: 30px;
    width: fit-content;
    min-width: 40px;

    margin: 10px 5px;
    background: var(--neutral4);
    border-radius: 6px;
    border: none;

    box-shadow: 0px 1px 1px 0px #22222219;
    cursor: pointer;
    transition: background 120ms ease-in-out;

    &:hover {
      background: var(--neutral3);
    }
  }

  .active {
    background: var(--neutral3);
  }
`

export default PageNavigation
