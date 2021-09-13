import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Search from 'src/components/shared-ui/Search'
import Link from 'src/components/shared-ui/Link'

type Props = {
  data: UserData[] | ListRequest[] | null
  className?: string
  icon: string
  iconBackground: string
  iconColor: string
  title: string
  description: string
  link?: {
    href: string
    text: string
  }
}

const SectionHeader: React.FC<Props> = ({
  className,
  data,
  icon,
  iconBackground,
  iconColor,
  title,
  description,
  link,
}) => (
  <div className={classNames(s.container, className)}>
    <div
      className={s.icon}
      style={{ background: iconBackground, color: iconColor }}
    >
      <SvgIcon icon={`${icon}.svg`} />
    </div>
    <div className={s.content}>
      <div className={s.title}>
        <span>{title}</span> ({data?.length}){' '}
        {link && (
          <Link className={s.link} href={link.href}>
            {link.text}
            <SvgIcon className={s.linkIcon} icon="back.svg" />
          </Link>
        )}
      </div>
      <div className={s.description}>{description}</div>
    </div>
    <Search
      classes={{ container: s.search }}
      inputPlaceholder="Search contacts…"
    />
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 22px 21px 22px 25px;

    width: 100%;

    @include mobile {
      flex-flow: column nowrap;
      padding: 16px;
    }
  }

  .icon {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    width: 53px;
    height: 53px;

    @include mobile {
      margin-bottom: 16px;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-left: 30px;

    @include mobile {
      margin-left: 0;
      margin-bottom: 16px;
      text-align: center;
    }
  }

  .search {
    margin-left: auto;
    @include mobile {
      margin-left: 0;
    }
  }

  .title {
    margin-bottom: 4px;

    font-size: 22px;
    line-height: 22px;

    span {
      font-weight: var(--bold);
    }
  }

  .description {
    font-size: 12px;
    line-height: 22px;
  }

  .link {
    position: relative;
    margin-left: 16px;

    text-decoration: none;
    font-size: 14px;
    line-height: 17px;
    font-weight: var(--bold);
    color: var(--blue);
  }

  .linkIcon {
    width: 10px;
    height: 10px;
    margin-left: 6px;

    color: var(--blue);
    transform: rotate(180deg);
  }
`

export default SectionHeader
