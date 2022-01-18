import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  data: {
    background: string
    text: string
    icon: string
  }
}

const PersonalizationSocial: React.FC<Props> = ({ className, data }) => (
  <a
    className={classNames(className, s.container)}
    style={{ background: data.background }}
    href="#"
  >
    <SvgIcon icon={data.icon} className={s.icon} />
    <span>{data.text}</span>
  </a>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 5px 23px;

    font-weight: var(--semiBold);
    text-decoration: none;
    color: var(--white);
    border-radius: 16px;
    cursor: pointer;

    @include mobile {
      max-width: 120px;
      margin-bottom: 10px;
    }
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`

export default PersonalizationSocial
