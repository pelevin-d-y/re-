import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Img from 'src/components/shared-ui/Img'

type Props = {
  className?: string
  title: string
  img?: string
  handler?: () => void
}

const OnboardingTasks: React.FC<Props> = ({
  className,
  title,
  img,
  handler,
}) => (
  <div
    className={classNames(className, s.container)}
    onClick={handler}
    onKeyPress={handler}
    role="button"
    tabIndex={0}
  >
    {img && <Img img={img} alt={title} className={s.image} />}
    <p className={s.title}>{title}</p>
  </div>
)

const s = css`
  .container {
    background-color: var(--white);
    width: 72px;
    padding: 18px;

    text-align: center;
    border-radius: 4px;
    cursor: pointer;

    font-size: 12px;
    color: var(--blue);

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1),
      0px 1px 1px rgba(34, 34, 34, 0.098);

    &:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2),
        0px 1px 1px rgba(34, 34, 34, 0.098);
    }
  }

  .image {
    width: 32px;
    height: 32px;
    margin-bottom: 5px;
  }

  .title {
    border: none;
    outlined: none;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: var(--black);
  }
`

export default OnboardingTasks
