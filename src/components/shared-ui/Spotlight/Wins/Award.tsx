import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Img from 'src/components/shared-ui/Img'

type Props = {
  className?: string
  data: {
    title: string
    image: string
  }
}

const Award: React.FC<Props> = ({ className, data }) => (
  <div className={classNames(className, s.container)}>
    <Img className={s.image} img={data.image} alt={data.title} />
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 77px;
    height: 60px;

    background: var(--white);
    box-shadow: 0px 1px 1px rgba(34, 34, 34, 0.0989128);
    border-radius: 100px;
  }

  .image {
    width: 50px;
    height: 50px;

    border-radius: 50%;
  }
`

export default Award
