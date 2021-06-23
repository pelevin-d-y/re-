import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useLists } from 'src/components/context/ListsContext'
import ListsCatalog from './ListsCatalog'
import ListsContacts from './ListsContacts'

type Props = {
  className?: string
}

const ListsContent: React.FC<Props> = ({ className }) => {
  const { state: lists } = useLists()

  return (
    <div className={classNames(s.container, className)}>
      {lists ? (
        <>
          <ListsContacts className={s.contacts} />
          <ListsCatalog />
        </>
      ) : (
        <SvgIcon
          className={s.spinner}
          icon={require(`public/svg/spinner.svg?include`)}
        />
      )}
    </div>
  )
}

const s = css`
  .container {
    padding: 0 12px 12px 0;
  }

  .contacts {
    margin-bottom: 15px;
  }

  .spinner {
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
`

export default ListsContent
