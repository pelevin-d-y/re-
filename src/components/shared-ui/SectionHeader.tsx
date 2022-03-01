import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
// import Search from 'src/components/shared-ui/Search'
import Link from 'src/components/shared-ui/Link'
import Typography from './Typography'

type Props = {
  data: RecommendationUser[] | ListData[] | FormattedContact[] | null
  className?: string
  icon: string
  iconBackground: string
  iconColor: string
  title: string
  description: string
  hideNumber: boolean
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
  hideNumber,
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
        <Typography fontVariant="gilroy" fontWeight="bold" styleVariant="h3">
          {title}{' '}
          <span className={s.count}>{!hideNumber && ` (${data?.length})`}</span>
        </Typography>

        {link && (
          <Link className={s.link} href={link.href}>
            {link.text}
            <SvgIcon className={s.linkIcon} icon="arrow-left.svg" />
          </Link>
        )}
      </div>
      <Typography fontVariant="inter" styleVariant="body3">
        {description}
      </Typography>
    </div>
    {/* <Search
      classes={{ container: s.search }}
      inputPlaceholder="Search contacts…"
    /> */}
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
    display: flex;
    align-items: baseline;
    margin-bottom: 4px;
    color: var(--neutral1);

    @include mobile {
      flex-flow: column nowrap;
      text-align: center;
      align-items: center;
    }
  }

  .count {
    color: var(--primary1);
  }

  .link {
    position: relative;
    margin-left: 16px;

    text-decoration: none;
    font-size: 14px;
    line-height: 17px;
    font-weight: var(--bold);
    color: var(--primary1);

    @include mobile {
      margin-top: 8px;
      margin-left: 15px;
    }
  }

  .linkIcon {
    width: 10px;
    height: 10px;
    margin-left: 6px;

    color: var(--primary1);
    transform: rotate(180deg);
  }
`

export default SectionHeader
