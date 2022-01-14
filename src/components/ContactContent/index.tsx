import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import ContactCard from './ContactCard'
import ContactTabs from './ContactTabs'
import { HOCUpdateMutableData } from '../HOCs/HOCUpdateMutableData'

type Props = {
  className?: string
}

const ContactContent: React.FC<Props> = ({ className }) => {
  const { query } = useRouter()

  const WithMutableDataContactCard = HOCUpdateMutableData({
    WrappedComponent: ContactCard,
    id: query.id as string,
  })

  const WithMutableDataContactTabs = HOCUpdateMutableData({
    WrappedComponent: ContactTabs,
    id: query.id as string,
  })

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.section}>
        <WithMutableDataContactCard />
        <WithMutableDataContactTabs />
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 10px 14px 14px;
  }

  .section {
    display: flex;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
    border-radius: 6px;
    border-top: 4px solid #0b5cff;

    @include mobile {
      flex-flow: column nowrap;
    }
  }
`

export default ContactContent
