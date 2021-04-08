import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'

const Likes: React.FC = () => (
  <>
    <button className={classNames(s.button, s.like)} type="button">
      <img
        className={s.image}
        src={require('public/images/like.png')}
        alt="like"
      />
    </button>
    <button className={classNames(s.button, s.dislike)} type="button">
      <img
        className={s.image}
        src={require('public/images/like.png')}
        alt="dislike"
      />
    </button>
  </>
)

const s = css`
  .button {
    padding: 9px;
    cursor: pointer;

    background: var(--white);
    border: 1px solid #dfdfdf;
    border-radius: 50%;
    line-height: 0;
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
