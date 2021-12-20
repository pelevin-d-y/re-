import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useRouter } from 'next/router'
import ContactCard from './ContactCard'
import ContactTabs from './ContactTabs'
import { useClient } from '../context/ClientContext'

type Props = {
  className?: string
}

const ContactContent: React.FC<Props> = ({ className }) => {
  const { query } = useRouter()
  const { state: clientState } = useClient()

  const client = clientState?.data?.contacts?.filter(
    ({ contact_id }) => contact_id === query.id
  )?.[0]

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.section}>
        {client && (
          <>
            <ContactCard data={client} />
            <ContactTabs data={client} />
          </>
        )}
      </div>
    </div>
  )
}

const s = css`
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
  }
`

export default ContactContent
