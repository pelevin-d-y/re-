import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

const Likes: React.FC = () => (
  <>
    <button className={classNames(s.button, s.like)} type="button">
      <SvgIcon className={s.image} icon="like.svg" />
    </button>
    <button className={classNames(s.button, s.dislike)} type="button">
      <SvgIcon className={s.image} icon="like.svg" />
    </button>
  </>
)

const s = css`
  .button {
    padding: 9px;
    cursor: pointer;

    background: var(--white);
    border: 1px solid #a7a7a7;
    border-radius: 50%;
    line-height: 0;
    color: #a7a7a7;
    transition: all 0.2s linear;

    &:hover {
      color: var(--white);
      border: 1px solid var(--white);
      background: #a7a7a7;
    }
  }

  .image {
    width: 15px;
    height: 15px;
    object-fit: contain;
  }

  .like {
    margin-right: 5px;
  }

  .dislike {
    transform: rotate(180deg);
  }
`

export default Likes
