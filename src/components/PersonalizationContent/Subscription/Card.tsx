import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Img from 'src/components/shared-ui/Img'

type Props = {
  classes?: {
    container?: string
    button?: string
  }
  description: string
  title: string
  features: string[]
  buttonText: string
  img: string
}

const Card: React.FC<Props> = ({
  classes,
  description,
  title,
  features,
  buttonText,
  img,
}) => (
  <div className={classNames(classes?.container, s.container)}>
    <div className={s.description}>{description}</div>
    <div className={s.title}>{title}</div>
    <Img className={s.image} img={img} alt="image" />
    <ul className={s.list}>
      {features.map((item) => (
        <li className={s.feature} key={item}>
          {item}
        </li>
      ))}
    </ul>
    <button className={classNames(s.button, classes?.button)} type="button">
      {buttonText}
    </button>
  </div>
)

const s = css`
  .container {
    position: relative;
    padding: 20px 16px 24px 28px;
    overflow: hidden;

    color: var(--white);
    border-radius: 6px;
  }

  .description {
    margin-bottom: 15px;

    font-size: 16px;
    line-height: 20px;
  }

  .title {
    margin-bottom: 21px;

    font-size: 28px;
    font-weight: var(--bold);
  }

  .image {
    position: absolute;
    right: -25px;
    top: 50%;
    transform: translateY(-50%);

    width: 262px;
    height: 196px;
    object-fit: contain;
  }

  .list {
    margin-bottom: 26px;
  }

  .feature {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .button {
    padding: 7px 8px;
    min-width: 174px;
    color: var(--white);
    font-weight: var(--semibold);

    cursor: pointer;
    border-radius: 16px;
    border: none;
  }
`

export default Card
