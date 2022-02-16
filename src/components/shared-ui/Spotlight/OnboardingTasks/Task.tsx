import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Img from 'src/components/shared-ui/Img'

type Props = {
  className?: string
  img?: string
  handler?: () => void
}

const OnboardingTasks: React.FC<Props> = ({
  className,
  img,
  handler,
  children,
}) => (
  <div
    className={classNames(className, s.container)}
    onClick={handler}
    onKeyPress={handler}
    role="button"
    tabIndex={0}
  >
    {img && <Img img={img} alt="" className={s.image} />}
    <p>{children}</p>
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
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
  }
`

export default OnboardingTasks
